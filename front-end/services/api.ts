import axios from "axios";

const config = {
    baseURL: "http://localhost:3001",
}

const api = axios.create(config);

export default api