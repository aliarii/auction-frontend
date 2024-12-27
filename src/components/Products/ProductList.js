import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ onProductSelect }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data);
            } catch (err) {
                console.error("Ürünler yüklenemedi:", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tüm Ürünler</h1>
            <ul className="space-y-2">
                {products.map((product) => (
                    <li
                        key={product._id}
                        className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
                        onClick={() => onProductSelect(product)}
                    >
                        <h2 className="font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
