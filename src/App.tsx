import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './context/AuthContext';
import Welcome from './components/Welcome';
import AllWorkouts from './components/AllWorkouts';
import AddNewWorkout from './components/AddNewWorkout';
import WorkoutTypes from './components/WorkoutTypes';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/workouts" replace /> : <Welcome />}
      />
      <Route
        path="/workouts"
        element={user ? <AllWorkouts /> : <Navigate to="/" replace />}
      />
      <Route
        path="/add-workout"
        element={user ? <AddNewWorkout /> : <Navigate to="/" replace />}
      />
      <Route
        path="/workout-types"
        element={user ? <WorkoutTypes /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
