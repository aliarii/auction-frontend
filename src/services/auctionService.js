import axios from "axios";

export const getAuctions = async () => {
    const response = await axios.get("http://localhost:5000/api/auctions");
    return response.data;
};

export const getAuctionById = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/auctions/${id}`);
    return response.data;
};
export const getWonAuctions = async () => {
    const response = await axios.get("http://localhost:5000/api/auctions/won", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

export const addAuction = async (auctionData) => {
    const response = await axios.post("http://localhost:5000/api/auctions/start", auctionData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};