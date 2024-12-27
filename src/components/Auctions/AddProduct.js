import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [auctionDuration, setAuctionDuration] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/products",
                {
                    name,
                    description,
                    startingPrice,
                    auctionDuration, // Dakika cinsinden süre
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Ürün başarıyla eklendi!");
            setName("");
            setDescription("");
            setStartingPrice("");
            setAuctionDuration("");
        } catch (err) {
            console.error(err);
            alert("Ürün ekleme başarısız! Lütfen bilgilerinizi kontrol edin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Ürün Ekle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Ürün Adı:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Ürün adı giriniz"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Açıklama:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Ürün açıklaması giriniz"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Başlangıç Fiyatı (TL):</label>
                        <input
                            type="number"
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Başlangıç fiyatını giriniz"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Açık Artırma Süresi (Dakika):</label>
                        <input
                            type="number"
                            value={auctionDuration}
                            onChange={(e) => setAuctionDuration(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Süreyi dakika olarak giriniz"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded-lg transition ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Gönderiliyor..." : "Ürün Ekle"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
