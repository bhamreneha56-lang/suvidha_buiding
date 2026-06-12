import axios from 'axios';

// Adjust base URL as needed (e.g., http://localhost:5000)
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 5000,
});

export default instance;
