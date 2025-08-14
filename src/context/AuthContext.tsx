import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getRedirectResult
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Try popup first, fall back to redirect if it fails
      try {
        const result = await signInWithPopup(auth, provider);
        
        if (result.user) {
          // Check if user exists in Firestore, if not create them
          const userDocRef = doc(db, 'users', result.user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // Create new user in Firestore
            const newUser: User = {
              id: result.user.uid,
              username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
              email: result.user.email || '',
              createdAt: new Date().toISOString()
            };
            
            await setDoc(userDocRef, newUser);
            setUser(newUser);
          } else {
            // User exists, get their data
            const userData = userDoc.data() as User;
            setUser(userData);
          }
        }
      } catch (popupError: any) {
        // If popup fails, try redirect
        if (popupError.code === 'auth/popup-closed-by-user' || 
            popupError.code === 'auth/popup-blocked' ||
            popupError.code === 'auth/cancelled-popup-request' ||
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.message?.includes('Cross-Origin-Opener-Policy')) {
          console.log('Popup failed, trying redirect...', popupError.message);
          await signInWithRedirect(auth, provider);
        } else {
          throw popupError;
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleAuthStateChange = async () => {
      try {
        // Check for redirect result first
        const result = await getRedirectResult(auth);
        
        if (result) {
          // User just signed in via redirect
          if (result.user) {
            try {
              // Check if user exists in Firestore, if not create them
              const userDocRef = doc(db, 'users', result.user.uid);
              const userDoc = await getDoc(userDocRef);
              
              if (!userDoc.exists()) {
                // Create new user in Firestore
                const newUser: User = {
                  id: result.user.uid,
                  username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
                  email: result.user.email || '',
                  createdAt: new Date().toISOString()
                };
                
                await setDoc(userDocRef, newUser);
                setUser(newUser);
              } else {
                // User exists, get their data
                const userData = userDoc.data() as User;
                setUser(userData);
              }
            } catch (dbError) {
              console.warn('Firestore error during user creation:', dbError);
              // Still set the user even if Firestore fails
              const fallbackUser: User = {
                id: result.user.uid,
                username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
                email: result.user.email || '',
                createdAt: new Date().toISOString()
              };
              setUser(fallbackUser);
            }
          }
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }

      // Set up auth state listener
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            // Get user data from Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              setUser(userData);
            } else {
              // Create user if they don't exist in Firestore
              const newUser: User = {
                id: firebaseUser.uid,
                username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                email: firebaseUser.email || '',
                createdAt: new Date().toISOString()
              };
              
              try {
                await setDoc(userDocRef, newUser);
                setUser(newUser);
              } catch (createError) {
                console.warn('Failed to create user in Firestore:', createError);
                setUser(newUser); // Set user anyway
              }
            }
          } catch (dbError) {
            console.warn('Firestore error during auth state change:', dbError);
            // Create fallback user if Firestore fails
            const fallbackUser: User = {
              id: firebaseUser.uid,
              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              createdAt: new Date().toISOString()
            };
            setUser(fallbackUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return unsubscribe;
    };

    handleAuthStateChange();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 