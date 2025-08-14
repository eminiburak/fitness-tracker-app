import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, FitnessCenter as DumbbellIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/workouts');
  };

  const handleAddWorkout = () => {
    navigate('/add-workout');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3498db' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left - Logo/Dumbbell Icon */}
        <IconButton
          color="inherit"
          onClick={handleLogoClick}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <DumbbellIcon sx={{ fontSize: 28 }} />
        </IconButton>
        
        {/* Center - Plus Icon */}
        <IconButton
          color="inherit"
          onClick={handleAddWorkout}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
            },
          }}
        >
          <AddIcon sx={{ fontSize: 28 }} />
        </IconButton>
        
        {/* Right - Logout */}
        <Typography
          variant="body1"
          onClick={handleLogout}
          sx={{
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Logout
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
