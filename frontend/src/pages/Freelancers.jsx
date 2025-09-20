import { useState, useEffect } from 'react';
import { getUsers } from '../services/api';

function Freelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const users = await getUsers();
        // Filter only freelancers
        const freelancersList = users.filter(user => user.isFreelancer);
        setFreelancers(freelancersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  if (loading) {
    return <div>Loading freelancers...</div>;
  }

  return (
    <div className="section">
      <h1 className="section-title">Available Freelancers</h1>
      
      {freelancers.length === 0 ? (
        <p>No freelancers available at the moment.</p>
      ) : (
        <div className="grid">
          {freelancers.map((freelancer) => (
            <div key={freelancer._id} className="card">
              <h3>{freelancer.name}</h3>
              <p>{freelancer.bio || 'No bio available'}</p>
              <p><strong>Skills:</strong> {freelancer.skills?.join(', ') || 'No skills listed'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Freelancers;