const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Project = require('./models/Project');
const Proposal = require('./models/Proposal');

const app = express();
const PORT = process.env.PORT || 5001; // Using port 5001 to match frontend configuration

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/workhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const proposalRoutes = require('./routes/proposalRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/proposals', proposalRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('WorkHub API is running (Demo Mode)');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));