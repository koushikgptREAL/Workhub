import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getProposalsByProject, createProposal } from '../services/api';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    coverLetter: '',
    price: ''
  });

  useEffect(() => {
    const fetchProjectAndProposals = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
        
        const proposalsData = await getProposalsByProject(id);
        setProposals(proposalsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProjectAndProposals();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, we would get the freelancer ID from auth context
      // For demo purposes, we'll use a placeholder
      const freelancerId = '123456789012345678901234'; // Placeholder
      
      const proposalData = {
        project: id,
        freelancer: freelancerId,
        coverLetter: formData.coverLetter,
        price: Number(formData.price)
      };
      
      await createProposal(proposalData);
      alert('Proposal submitted successfully!');
      
      // Reset form
      setFormData({
        coverLetter: '',
        price: ''
      });
      
      // Refresh proposals
      const proposalsData = await getProposalsByProject(id);
      setProposals(proposalsData);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="section">
      <h1 className="section-title">{project.title}</h1>
      
      <div className="card">
        <h3>Project Details</h3>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Budget:</strong> ${project.budget}</p>
        <p><strong>Status:</strong> {project.status}</p>
      </div>
      
      <div className="card">
        <h3>Submit a Proposal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              className="form-control"
              value={formData.coverLetter}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="price" className="form-label">Your Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit Proposal</button>
        </form>
      </div>
      
      <div className="card">
        <h3>Proposals ({proposals.length})</h3>
        {proposals.length === 0 ? (
          <p>No proposals yet.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal._id} className="card">
              <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
              <p><strong>Price:</strong> ${proposal.price}</p>
              <p><strong>Status:</strong> {proposal.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;