import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserName');
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>WorkHub</Link>
      <div>
        <Link to="/dashboard" style={{ marginRight: '15px', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/my-projects" style={{ marginRight: '15px', textDecoration: 'none' }}>My Projects</Link>
        <button 
          onClick={handleLogout}
          style={{ 
            background: '#f44336', 
            color: 'white', 
            padding: '5px 10px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;