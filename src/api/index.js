import axios from 'axios';

// Base config for Axios
const request = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  validateStatus: status => {
    return status >= 200 && status < 300
  }
});

export default request;