import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getAuctionById } from "../../services/auctionService";
import { placeBid } from "../../services/bidService";

const socket = io("http://localhost:5000"); // Backend URL'i

function AuctionDetails() {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const data = await getAuctionById(id);
                setAuction(data);
            } catch (error) {
                console.error("Açık artırma yüklenemedi:", error);
            }
        };

        fetchAuction();

        // Teklif güncellemelerini dinle
        socket.on("bidUpdate", (newBid) => {
            if (newBid.auctionId === id) {
                setAuction((prevAuction) => ({
                    ...prevAuction,
                    currentHighestBid: newBid.amount,
                    currentHighestBidder: newBid.user,
                }));
            }
        });

        return () => {
            socket.off("bidUpdate");
        };
    }, [id]);

    const handleBid = async (e) => {
        e.preventDefault();
        try {
            await placeBid(id, { amount: parseFloat(bidAmount) });
            socket.emit("newBid", id, { amount: parseFloat(bidAmount) });
            setBidAmount("");
        } catch (error) {
            alert("Teklif gönderilemedi: " + error.message);
        }
    };

    if (!auction) {
        return <p>Açık artırma yükleniyor...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{auction.title}</h1>
            <p>{auction.description}</p>
            <p>
                Mevcut En Yüksek Teklif:{" "}
                <span className="font-bold">
                    {auction.currentHighestBid?.amount || auction.startingPrice} TL
                </span>
            </p>
            <form onSubmit={handleBid} className="mt-4">
                <input
                    type="number"
                    placeholder="Teklif Tutarı"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border p-2 rounded mr-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Teklif Ver
                </button>
            </form>
        </div>
    );
}

export default AuctionDetails;
