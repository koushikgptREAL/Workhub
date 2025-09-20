import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';

function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', margin: '50px' }}>Loading projects...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Available Projects</h1>
      
      {projects.length === 0 ? (
        <h2 style={{ textAlign: 'center', margin: '50px', fontSize: '24px' }}>No projects available</h2>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.map(project => (
            <li key={project._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px' }}>
              <h3>{project.title}</h3>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Budget:</strong> ${project.budget}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <button 
                style={{ 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '8px 12px', 
                  border: 'none', 
                  cursor: 'pointer' 
                }}
                onClick={() => alert(`You've applied for ${project.title}!`)}
              >
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Projects;