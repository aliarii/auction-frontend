import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                setFilteredCategories(data); // Başlangıçta tüm kategorileri göster
            } catch (error) {
                console.error("Kategoriler yüklenemedi:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(term)
        );
        setFilteredCategories(filtered);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kategori Yönetimi</h1>
            <input
                type="text"
                placeholder="Kategori adı ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 mb-4 border rounded"
            />
            {filteredCategories.length > 0 ? (
                <ul>
                    {filteredCategories.map((category) => (
                        <li key={category._id} className="border-b py-2">
                            <h2 className="font-bold">{category.name}</h2>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Kategori bulunamadı.</p>
            )}
        </div>
    );
}

export default Categories;
