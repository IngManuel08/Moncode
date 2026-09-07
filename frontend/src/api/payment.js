import axiosInstance from "./axiosInstance";

export const createPaymentIntent = (amount) => axiosInstance.post('/create-payment-intent', { amount });
