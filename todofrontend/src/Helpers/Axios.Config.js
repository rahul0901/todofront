import axios from 'axios';

var BackendURL = 'http://localhost:8000/api/v1/';

if(process.env.Mode === "PRODUCTION"){
    BackendURL = "https://todobackend-sg4c.onrender.com/api/v1";
}

const api = axios.create({baseURL: 'https://todobackend-sg4c.onrender.com/api/v1'})

export default api;