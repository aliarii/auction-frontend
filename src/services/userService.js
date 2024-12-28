import axios from "axios";

export const getUserProfile = async () => {
    const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await axios.patch("http://localhost:5000/api/users/me", profileData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
export const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
