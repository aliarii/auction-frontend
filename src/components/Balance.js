import React, { useState, useEffect } from "react";
import socket from "../services/socket";
import axios from "axios";

function Balance() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setBalance(response.data.balance);
            } catch (err) {
                console.error("Teklif limiti alınamadı:", err);
            }
        };

        fetchBalance();

        socket.on("balanceUpdate", (data) => {
            setBalance(data.balance);
        });

        return () => {
            socket.off("balanceUpdate");
        };
    }, []);


    return (
        <div className="balance-info">
            <p>Kalan Teklif Limiti: {balance} TL</p>
        </div>
    );
}

export default Balance;
