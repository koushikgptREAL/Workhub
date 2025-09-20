import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert, Grid } from '@mui/material';
import { createProject } from '../services/api';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    prize: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (isNaN(formData.budget)) newErrors.budget = 'Budget must be a number';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget)
      };
      
      // Only add owner if user is logged in
      const userEmail = localStorage.getItem('currentUserEmail');
      if (userEmail) {
        projectData.owner = userEmail;
      }
      
      const response = await createProject(projectData);
      console.log('Project created successfully:', response);
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        budget: '',
        description: ''
      });
      
      // Navigate to My Projects page
      setTimeout(() => {
        navigate('/my-projects');
      }, 1000);
    } catch (error) {
      console.error('Error creating project:', error);
      setErrors({ submit: 'Failed to create project. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Upload a New Project</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Project Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', minHeight: '100px' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="budget" style={{ display: 'block', marginBottom: '5px' }}>Budget Amount ($)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              min="1"
              required
            />
          </div>
          <button 
            type="button" 
            onClick={(e) => {
              console.log('Button clicked');
              handleSubmit(e);
            }}
            disabled={isSubmitting}
            style={{ 
              background: '#4CAF50', 
              color: 'white', 
              padding: '10px 15px', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Project'}
          </button>
          {errors.submit && (
            <div style={{ color: 'red', marginTop: '10px' }}>{errors.submit}</div>
          )}
          {showSuccess && (
            <div style={{ color: 'green', marginTop: '10px' }}>Project created successfully!</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateProject;