// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEG0QDmgoXF3EYG2T-iOuhosycuiXNw78",
  authDomain: "fitness-tracker-app-c82c3.firebaseapp.com",
  projectId: "fitness-tracker-app-c82c3",
  storageBucket: "fitness-tracker-app-c82c3.firebasestorage.app",
  messagingSenderId: "795428177415",
  appId: "1:795428177415:web:1896f1663847c3a61ccca2",
  measurementId: "G-GW52M38DSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;