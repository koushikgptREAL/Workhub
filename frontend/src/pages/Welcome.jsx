import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password || (isSignup && !formData.name)) {
      alert('Please fill all fields');
      return;
    }

    // Store the current user's email in localStorage
    localStorage.setItem('currentUserEmail', formData.email);
    
    // In a real app, you would call an API here
    alert(isSignup ? 'Signup successful!' : 'Login successful!');
    
    // Navigate to dashboard page after login/signup
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Welcome to WorkHub</h1>
      <p>A platform to upload and view projects</p>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <button 
            type="submit" 
            style={{ 
              background: '#4CAF50', 
              color: 'white', 
              padding: '10px 15px', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p style={{ marginTop: '15px' }}>
          {isSignup ? 'Already have an account?' : 'Don\'t have an account?'} 
          <button 
            onClick={() => setIsSignup(!isSignup)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'blue', 
              textDecoration: 'underline', 
              cursor: 'pointer' 
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Welcome;