import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '/api',
    // baseURL: "http://localhost:3000/api",
    withCredentials: true
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // o donde guardes el token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;