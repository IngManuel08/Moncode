import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api";

export const updateProfileRequest = (data) =>
    axios.put(`${API}/profile`, data, {
        withCredentials: true
    });