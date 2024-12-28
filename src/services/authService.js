import axios from "axios";

export const loginUser = async (credentials) => {

    const response = await axios.post("http://localhost:5000/api/auth/login", credentials);

    localStorage.setItem("token", response.data.token); // Token kaydedilir
    return response.data.user;
};

export const registerUser = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", userData);
    return response.data;
};

