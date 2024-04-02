import axios from 'axios';

// Create a new Axios instance with default configuration

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URI}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});
 
 export default instance;