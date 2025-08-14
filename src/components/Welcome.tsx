import { Box, Button, Container, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Welcome: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Error signing in:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {/* Left Side - Fitness Illustration */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pr: 4,
          }}
        >
          <Box
            component="img"
            src="/images/workout.png"
            alt="Fitness workout illustration"
            sx={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Right Side - Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            pl: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#2c3e50',
              mb: 4,
              fontSize: '2.5rem',
            }}
          >
            Your Fitness Journey Starts Here
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#7f8c8d',
              mb: 6,
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            Track your workouts, monitor your progress, and achieve your fitness goals with our comprehensive tracking system.
          </Typography>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            sx={{
              borderColor: '#3498db',
              color: '#3498db',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderColor: '#2980b9',
                backgroundColor: '#f8f9fa',
                borderWidth: 2,
              },
              transition: 'all 0.3s ease',
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
