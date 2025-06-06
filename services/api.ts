import axios from "axios";

// http://192.168.100.124:3333/create

export const api = axios.create({
  baseURL: "https://dieta-ia-api.onrender.com",
});
