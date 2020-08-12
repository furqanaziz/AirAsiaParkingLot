import axios from 'axios';

export const API_URL = 'http://localhost:8080/api/v1';

export default {
  headers() {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  },

  get(path) {
    return axios.get(`${API_URL}${path}`, { headers: this.headers() });
  },

  post(path, body) {
    return axios.post(`${API_URL}${path}`, body, { headers: this.headers() });
  },
};
