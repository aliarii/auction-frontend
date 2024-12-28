import axios from "axios";

export const getCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/auction-categories");
    return response.data;
};
