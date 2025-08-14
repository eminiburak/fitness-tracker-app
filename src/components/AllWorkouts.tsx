import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Workout as WorkoutType } from '../types';
import WorkoutItem from './WorkoutItem';
import Navbar from './Navbar';

const AllWorkouts: React.FC = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const workoutsQuery = query(
      collection(db, 'workouts'),
      where('userId', '==', user.id)
    );

    const unsubscribe = onSnapshot(
      workoutsQuery,
      (querySnapshot) => {
        const workoutsData: WorkoutType[] = [];
        querySnapshot.forEach((doc) => {
          workoutsData.push({ id: doc.id, ...doc.data() } as WorkoutType);
        });
        setWorkouts(workoutsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching workouts:', error);
        setError('Failed to load workouts. Please try again.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && workouts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No workouts available. Add your first workout!
            </Typography>
          </Box>
        )}

        {!loading && !error && workouts.length > 0 && (
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 4, textAlign: 'center' }}>
              My Workouts
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {workouts.length} workout{workouts.length !== 1 ? 's' : ''} found
            </Typography>
            
            {workouts.map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
};

export default AllWorkouts;
