import axios from "axios"

export const API_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }

})