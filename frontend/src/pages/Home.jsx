import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="section">
      <h1>Welcome to WorkHub</h1>
      <p>A simple freelance marketplace for connecting clients and freelancers</p>
      
      <div className="card">
        <h2>For Clients</h2>
        <p>Post your projects and find talented freelancers to help you get the job done.</p>
        <Link to="/create-project" className="btn btn-primary">Post a Project</Link>
      </div>
      
      <div className="card">
        <h2>For Freelancers</h2>
        <p>Find projects that match your skills and submit proposals to win work.</p>
        <Link to="/projects" className="btn btn-primary">Browse Projects</Link>
      </div>
    </div>
  );
}

export default Home;