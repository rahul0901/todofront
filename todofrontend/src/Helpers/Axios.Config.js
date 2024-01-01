import axios from 'axios';

var BackendURL = 'http://localhost:8000/api/v1/';

if(process.env.Mode === "PRODUCTION"){
    BackendURL = "";
}

const api = axios.create({baseURL: BackendURL})

export default api;