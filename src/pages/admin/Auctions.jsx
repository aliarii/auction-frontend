import { useEffect, useState } from "react";
import { getAuctions } from "../../services/auctionService";

function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [filteredAuctions, setFilteredAuctions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const data = await getAuctions();
                setAuctions(data);
                setFilteredAuctions(data); // Başlangıçta tüm açık artırmaları göster
            } catch (error) {
                console.error("Açık artırmalar yüklenemedi:", error);
            }
        };

        fetchAuctions();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = auctions.filter((auction) =>
            auction.title.toLowerCase().includes(term)
        );
        setFilteredAuctions(filtered);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Açık Artırma Yönetimi</h1>
            <input
                type="text"
                placeholder="Açık artırma adı ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 mb-4 border rounded"
            />
            {filteredAuctions.length > 0 ? (
                <ul>
                    {filteredAuctions.map((auction) => (
                        <li key={auction._id} className="border-b py-2">
                            <h2 className="font-bold">{auction.title}</h2>
                            <p>{auction.description}</p>
                            <p>Başlangıç Fiyatı: {auction.startingPrice} TL</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Açık artırma bulunamadı.</p>
            )}
        </div>
    );
}

export default Auctions;
