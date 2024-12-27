import React, { useEffect, useState } from "react";
import { getExpiredProducts } from "../../services/api";

function ExpiredProducts() {
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExpiredProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getExpiredProducts(token); // Token'ı gönder
                setExpiredProducts(data);
            } catch (err) {
                console.error("Süresi bitmiş ürünler yüklenemedi:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExpiredProducts();
    }, []);

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Süresi Bitmiş Açık Artırmalar</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {expiredProducts.length === 0 ? (
                    <p>Henüz süresi bitmiş bir açık artırma yok.</p>
                ) : (
                    expiredProducts.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-gray-500">Başlangıç Fiyatı: {product.startingPrice} TL</p>
                            <p className="text-green-500">
                                En Yüksek Teklif: {product.highestBid?.amount || "Teklif Yok"} TL
                            </p>
                            {product.highestBid?.user ? (
                                <p className="text-blue-500">
                                    Kazanan: {product.highestBid.user.username}
                                </p>
                            ) : (
                                <p className="text-red-500">Kazanan Yok</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExpiredProducts;
