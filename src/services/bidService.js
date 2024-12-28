import axios from "axios";

export const placeBid = async (auctionId, bidData) => {
    const response = await axios.post("http://localhost:5000/api/bids", { auctionId, ...bidData }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
