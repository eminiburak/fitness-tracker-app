import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { WorkoutTypeName, Intensity } from '../types';
import workoutTypesData from '../db/workoutTypes.json';
import Navbar from './Navbar';

const AddNewWorkout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    exerciseType: '',
    duration: '',
    intensity: '',
  });

  const [formErrors, setFormErrors] = useState({
    exerciseType: '',
    duration: '',
    intensity: '',
  });

  const workoutTypes = workoutTypesData.workoutTypes;

  const validateForm = () => {
    const errors = {
      exerciseType: '',
      duration: '',
      intensity: '',
    };

    if (!formData.exerciseType) {
      errors.exerciseType = 'Exercise type is required';
    }

    if (!formData.duration) {
      errors.duration = 'Duration is required';
    } else if (isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      errors.duration = 'Duration must be a positive number';
    }

    if (!formData.intensity) {
      errors.intensity = 'Intensity is required';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      const newWorkout = {
        userId: user!.id,
        type: formData.exerciseType as WorkoutTypeName,
        duration: Number(formData.duration),
        intensity: formData.intensity as Intensity,
      };

      await addDoc(collection(db, 'workouts'), newWorkout);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/workouts');
      }, 2000);
    } catch (error) {
      console.error('Error adding workout:', error);
      setError('Failed to add workout. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/workouts')}
              sx={{ mr: 2, color: '#3498db' }}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Add New Workout
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Workout added successfully! Redirecting...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Exercise Type *</InputLabel>
              <Select
                value={formData.exerciseType}
                label="Exercise Type *"
                onChange={(e) => handleInputChange('exerciseType', e.target.value)}
                error={!!formErrors.exerciseType}
              >
                {workoutTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.exerciseType && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {formErrors.exerciseType}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Duration"
              type="number"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              error={!!formErrors.duration}
              helperText={formErrors.duration}
              sx={{ mb: 3 }}
              disabled={submitting}
            />

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Intensity *</InputLabel>
              <Select
                value={formData.intensity}
                label="Intensity *"
                onChange={(e) => handleInputChange('intensity', e.target.value)}
                error={!!formErrors.intensity}
                disabled={submitting}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
              {formErrors.intensity && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {formErrors.intensity}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={submitting ? <CircularProgress size={20} /> : <AddIcon />}
              disabled={submitting}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#3498db',
                '&:hover': {
                  backgroundColor: '#2980b9',
                },
              }}
            >
              {submitting ? 'Adding Workout...' : 'ADD WORKOUT'}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddNewWorkout;
