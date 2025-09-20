import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import MyProjects from './pages/MyProjects';
import BrowseProjects from './pages/BrowseProjects';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 20px' }}>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/upload-project" element={<CreateProject />} />
          <Route path="/browse-projects" element={<BrowseProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;