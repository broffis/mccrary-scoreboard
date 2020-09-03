import axios from 'axios';

const apiRoute = 'http://localhost:5000/api/v1';
let url = apiRoute;

const local = axios.create({
  baseURL: url,
});

export default local;