import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data); // Başlangıçta tüm ürünleri göster
            } catch (error) {
                console.error("Ürünler yüklenemedi:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Ürün Yönetimi</h1>
            <input
                type="text"
                placeholder="Ürün adı ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 mb-4 border rounded"
            />
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product._id} className="border-b py-2">
                            <h2 className="font-bold">{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Adet: {product.quantity}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ürün bulunamadı.</p>
            )}
        </div>
    );
}

export default Products;
