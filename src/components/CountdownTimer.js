import React, { useEffect, useState } from "react";
import axios from "axios";

function CountdownTimer({ productId }) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchTimeLeft = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}/time-left`);
                setTimeLeft(response.data.timeLeft);
            } catch (err) {
                console.error("Kalan süre alınamadı:", err);
            }
        };

        fetchTimeLeft();

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Her saniye güncelle
        }, 1000);

        return () => clearInterval(interval);
    }, [productId]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return <p>Kalan Süre: {formatTime(timeLeft)}</p>;
}

export default CountdownTimer;
