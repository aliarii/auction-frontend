import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBidHistory } from "../../services/api";

function BidHistory() {
    const { productId } = useParams(); // URL'den ürün ID'sini al
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getBidHistory(productId);
                setBids(data);
            } catch (err) {
                console.error("Teklif geçmişi yüklenemedi:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [productId]);

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Teklif Geçmişi</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {bids.length === 0 ? (
                    <p>Bu ürün için henüz teklif verilmemiş.</p>
                ) : (
                    <ul>
                        {bids.map((bid) => (
                            <li
                                key={bid._id}
                                className="border-b py-2 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold">{bid.user.username}</p>
                                    <p className="text-gray-500 text-sm">{new Date(bid.createdAt).toLocaleString()}</p>
                                </div>
                                <p className="text-green-500 font-bold">{bid.amount} TL</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default BidHistory;
