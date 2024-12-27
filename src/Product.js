import React, { useEffect, useState } from "react";

function Product({ product }) {
    const [remainingTime, setRemainingTime] = useState(product.remainingTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => Math.max(0, prev - 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Kalan Süre: {Math.floor(remainingTime / 1000)} saniye</p>
            <p>En Yüksek Teklif: {product.highestBid.amount}</p>
        </div>
    );
}

export default Product;
