import { useEffect, useState } from "react";
import { getAuctions } from "../../services/auctionService";

function Auctions() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const data = await getAuctions();
                setAuctions(data);
            } catch (error) {
                console.error("Açık artırmalar yüklenemedi:", error);
            }
        };

        fetchAuctions();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Açık Artırmalar</h1>
            {auctions.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {auctions.map((auction) => (
                        <li key={auction._id} className="border rounded p-4 shadow">
                            <h2 className="text-lg font-semibold">{auction.title}</h2>
                            <p>{auction.description}</p>
                            <p>
                                Başlangıç Fiyatı:{" "}
                                <span className="font-bold">{auction.startingPrice} TL</span>
                            </p>
                            <p>
                                En Yüksek Teklif:{" "}
                                <span className="font-bold">{auction.currentHighestBid?.amount || auction.startingPrice} TL</span>
                            </p>
                            <a
                                href={`/auctions/${auction._id}`}
                                className="text-blue-500 underline"
                            >
                                Detayları Gör
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Yükleniyor veya açık artırma bulunamadı.</p>
            )}
        </div>
    );
}

export default Auctions;
