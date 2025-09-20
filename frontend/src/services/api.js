import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// User API calls
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

// Project API calls
export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  console.log('Creating project with data:', projectData);
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    console.log('Project creation response:', response);
    return response.data;
  } catch (error) {
    console.error('Project creation error:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/projects/${id}`);
  return response.data;
};

// Proposal API calls
export const getProposals = async () => {
  const response = await axios.get(`${API_URL}/proposals`);
  return response.data;
};

export const getProposalsByProject = async (projectId) => {
  const response = await axios.get(`${API_URL}/proposals/project/${projectId}`);
  return response.data;
};

export const getProposalsByFreelancer = async (freelancerId) => {
  const response = await axios.get(`${API_URL}/proposals/freelancer/${freelancerId}`);
  return response.data;
};

export const createProposal = async (proposalData) => {
  const response = await axios.post(`${API_URL}/proposals`, proposalData);
  return response.data;
};

export const updateProposal = async (id, proposalData) => {
  const response = await axios.put(`${API_URL}/proposals/${id}`, proposalData);
  return response.data;
};

export const deleteProposal = async (id) => {
  const response = await axios.delete(`${API_URL}/proposals/${id}`);
  return response.data;
};