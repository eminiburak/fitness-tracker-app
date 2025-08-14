import { Container, Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import workoutTypesData from '../db/workoutTypes.json';
import Navbar from './Navbar';

const WorkoutTypes: React.FC = () => {
  const workoutTypes = workoutTypesData.workoutTypes;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            color: '#2c3e50',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Available Workout Types
        </Typography>

        <Grid container spacing={3}>
          {workoutTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <FitnessCenter color="primary" sx={{ color: '#3498db' }} />
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {type.name}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      flexGrow: 1,
                      lineHeight: 1.5,
                    }}
                  >
                    {type.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Chip
                      label={type.id}
                      size="small"
                      sx={{
                        backgroundColor: '#ecf0f1',
                        color: '#7f8c8d',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WorkoutTypes;
