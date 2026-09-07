import axios from "./axiosInstance";

export const register = user => axios.post("/register", user);

export const login = user => axios.post("/login", user, { withCredentials: true });

export const logout = () => axios.post("/logout");

export const profile = () => axios.get("/profile");

export const verifyToken = () => axios.get('/verifique');





