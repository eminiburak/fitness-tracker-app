import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { FitnessCenter, Timer, TrendingUp } from '@mui/icons-material';
import { Workout as WorkoutType, Intensity } from '../types';

interface WorkoutItemProps {
  workout: WorkoutType;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const getIntensityColor = (intensity: Intensity) => {
    switch (intensity) {
      case Intensity.Low:
        return '#27ae60';
      case Intensity.Medium:
        return '#f39c12';
      case Intensity.High:
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FitnessCenter color="primary" sx={{ color: '#3498db' }} />
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {workout.type}
            </Typography>
          </Box>
          
          <Chip
            label={workout.intensity}
            size="small"
            sx={{
              backgroundColor: getIntensityColor(workout.intensity),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer color="action" sx={{ color: '#7f8c8d' }} />
            <Typography variant="body2" color="text.secondary">
              Duration: {workout.duration}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="action" sx={{ color: '#7f8c8d' }} />
            <Typography variant="body2" color="text.secondary">
              Intensity: {workout.intensity}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutItem;
