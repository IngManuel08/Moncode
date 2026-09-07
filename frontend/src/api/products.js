import axiosInstance from "./axiosInstance";

// ruta para traer todos los productos por id
export const getAllProducts = () => axiosInstance.get("/getallproducts");

export const searchProducts = (searchQuery) => axiosInstance.get(`/search?search=${searchQuery}`);







//ruta para traer todos los productos por id

export const createProductReview = (id, reviewData) => axiosInstance.post(`/products/${id}/reviews`, reviewData);
