import { useState, useEffect } from "react";
import { getWonAuctions } from "../../services/auctionService";

function WonAuctions() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchWonAuctions = async () => {
            try {
                const data = await getWonAuctions();
                setAuctions(data);
            } catch (error) {
                console.error("Kazandığınız açık artırmalar yüklenemedi:", error);
            }
        };

        fetchWonAuctions();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kazandığım Açık Artırmalar</h1>
            {auctions.length > 0 ? (
                <ul>
                    {auctions.map((auction) => (
                        <li key={auction._id} className="mb-4 border p-4 rounded shadow">
                            <h2 className="text-lg font-bold">{auction.title}</h2>
                            <p>{auction.description}</p>
                            <p className="text-green-500">
                                Kazandığınız Fiyat: {auction.finalPrice} TL
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz kazandığınız bir açık artırma yok.</p>
            )}
        </div>
    );
}

export default WonAuctions;
