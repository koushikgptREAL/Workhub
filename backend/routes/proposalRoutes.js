const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');

// Get all proposals
router.get('/', async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate('project', 'title budget')
      .populate('freelancer', 'name email');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get proposals by project
router.get('/project/:projectId', async (req, res) => {
  try {
    const proposals = await Proposal.find({ project: req.params.projectId })
      .populate('freelancer', 'name email');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get proposals by freelancer
router.get('/freelancer/:freelancerId', async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.params.freelancerId })
      .populate('project', 'title budget');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create proposal
router.post('/', async (req, res) => {
  try {
    const { project, freelancer, coverLetter, price } = req.body;
    
    const proposal = new Proposal({
      project,
      freelancer,
      coverLetter,
      price
    });
    
    const savedProposal = await proposal.save();
    res.status(201).json(savedProposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update proposal status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
    
    proposal.status = status || proposal.status;
    
    const updatedProposal = await proposal.save();
    res.json(updatedProposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete proposal
router.delete('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
    
    await proposal.deleteOne();
    res.json({ message: 'Proposal removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;