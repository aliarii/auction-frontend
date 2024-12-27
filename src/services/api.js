import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const getBidHistory = async (productId) => {
    const response = await api.get(`/bids/${productId}/history`);
    return response.data;
};

export const placeBid = async (productId, bidAmount, token) => {
    const response = await api.post(
        `/bids/${productId}`,
        { bidAmount },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
export const getExpiredProducts = async (token) => {
    const response = await api.get("/products/expired", {
        headers: {
            Authorization: `Bearer ${token}`, // Token'ı header'da gönder
        },
    });
    return response.data;
};
export default api;
