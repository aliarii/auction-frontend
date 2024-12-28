import axios from "axios";

export const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
export const addProduct = async (productData) => {
    const response = await axios.post("http://localhost:5000/api/products/add", productData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
