import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '15px 0',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const hoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  };

  const handleCardHover = (e, hover) => {
    if (hover) {
      Object.assign(e.currentTarget.style, hoverStyle);
    } else {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = cardStyle.boxShadow;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>What would you like to do today?</p>

      <div 
        style={cardStyle}
        onClick={() => navigate('/my-projects')}
        onMouseEnter={(e) => handleCardHover(e, true)}
        onMouseLeave={(e) => handleCardHover(e, false)}
      >
        <h2>View Your Projects</h2>
        <p>Access and manage all your uploaded projects</p>
      </div>

      <div 
        style={cardStyle}
        onClick={() => navigate('/create-project')}
        onMouseEnter={(e) => handleCardHover(e, true)}
        onMouseLeave={(e) => handleCardHover(e, false)}
      >
        <h2>Upload New Project</h2>
        <p>Share your work with the community</p>
      </div>

      <div 
        style={cardStyle}
        onClick={() => navigate('/browse-projects')}
        onMouseEnter={(e) => handleCardHover(e, true)}
        onMouseLeave={(e) => handleCardHover(e, false)}
      >
        <h2>Browse Other Projects</h2>
        <p>Discover projects from other users</p>
      </div>
    </div>
  );
};

export default Dashboard;