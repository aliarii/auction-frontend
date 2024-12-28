import axios from "axios";
export const getCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/product-categories", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
export const addCategory = async (categoryData) => {
    const response = await axios.post("http://localhost:5000/api/product-categories/create", categoryData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
