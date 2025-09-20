const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create project
router.post('/', async (req, res) => {
  try {
    const { title, description, budget, owner } = req.body;
    
    // Create project object without owner if it's not a valid ObjectId
    const projectData = {
      title,
      description,
      budget
    };
    
    // Only add owner if it exists and appears to be a valid ObjectId
    if (owner && /^[0-9a-fA-F]{24}$/.test(owner)) {
      projectData.owner = owner;
    }
    
    const project = new Project(projectData);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, budget, status } = req.body;
    
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    project.title = title || project.title;
    project.description = description || project.description;
    project.budget = budget || project.budget;
    project.status = status || project.status;
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;