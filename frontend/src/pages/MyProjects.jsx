import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../services/api';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get current user email
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        
        // Fetch all projects from API
        const allProjects = await getProjects();
        
        // Filter projects by the current user's email
        // In a real app with proper authentication, you would filter by user ID
        console.log('All projects:', allProjects);
        console.log('Current user email:', currentUserEmail);
        
        // Show all projects for demo purposes
        const userProjects = allProjects;
        
        setProjects(userProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Projects
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/create-project')}
          >
            Upload New Project
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      ) : projects.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            You haven't uploaded any projects yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/create-project')}
            sx={{ mt: 2 }}
          >
            Upload Your First Project
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Budget: ${project.budget}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Status: {project.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyProjects;