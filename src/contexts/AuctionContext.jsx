import { createContext, useContext, useState } from "react";

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
    const [auctions, setAuctions] = useState([]); // Açık artırmaların listesi

    const fetchAuctions = (auctionList) => {
        setAuctions(auctionList);
    };

    const updateAuction = (auctionId, updatedData) => {
        setAuctions((prevAuctions) =>
            prevAuctions.map((auction) =>
                auction.id === auctionId ? { ...auction, ...updatedData } : auction
            )
        );
    };

    return (
        <AuctionContext.Provider value={{ auctions, fetchAuctions, updateAuction }}>
            {children}
        </AuctionContext.Provider>
    );
};

export const useAuction = () => useContext(AuctionContext);
