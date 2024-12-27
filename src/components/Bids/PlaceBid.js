import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PlaceBid() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auctions/${auctionId}`);
                setAuction(response.data);
            } catch (err) {
                console.error("Açık artırma detayları alınamadı:", err);
            }
        };

        const fetchBidHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/bids/${auctionId}/history`
                );
                setBids(response.data);
            } catch (err) {
                console.error("Teklif geçmişi alınamadı:", err);
            }
        };

        fetchAuctionDetails();
        fetchBidHistory();
    }, [auctionId]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:5000/api/bids`,
                { auctionId, amount: bidAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Teklif başarıyla verildi!");
            setBidAmount("");
            // Teklif geçmişini yeniden yükle
            const response = await axios.get(`http://localhost:5000/api/bids/${auctionId}/history`);
            setBids(response.data);
        } catch (err) {
            console.error("Teklif verilemedi:", err);
            alert("Teklif verilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            {auction ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">{auction.product.name}</h1>
                    <p className="mb-4">{auction.product.description}</p>
                    <p className="mb-4">
                        <span className="font-bold">Başlangıç Fiyatı:</span> {auction.startingPrice} TL
                    </p>
                    <p className="mb-4">
                        <span className="font-bold">En Yüksek Teklif:</span>{" "}
                        {auction.currentHighestBid || "Henüz teklif yok"} TL
                    </p>
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Teklif Miktarını Girin"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                        >
                            Teklif Ver
                        </button>
                    </form>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Teklif Geçmişi</h2>
                {bids.length === 0 ? (
                    <p>Henüz teklif yok.</p>
                ) : (
                    <ul className="space-y-2">
                        {bids.map((bid) => (
                            <li key={bid._id} className="p-4 border rounded">
                                <p>
                                    <span className="font-bold">{bid.user.username}:</span> {bid.amount} TL
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(bid.createdAt).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default PlaceBid;
