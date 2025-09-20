import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../services/api';

const BrowseProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch all projects from API
        const allProjects = await getProjects();
        setProjects(allProjects);
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
          Browse Projects
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
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
            No projects available at the moment.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/create-project')}
            sx={{ mt: 2 }}
          >
            Create a Project
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
                  {project.owner && typeof project.owner === 'object' && (
                    <Typography variant="caption" display="block">
                      Owner: {project.owner.name || project.owner.email}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BrowseProjects;