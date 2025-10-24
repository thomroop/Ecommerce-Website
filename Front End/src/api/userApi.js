import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const getUserProfile = (token) =>
  API.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } });
