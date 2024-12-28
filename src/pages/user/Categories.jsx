import { useEffect, useState } from "react";
import { getCategories } from "../../services/auctionCategoryService";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Kategoriler yüklenemedi:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kategoriler</h1>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <li key={category._id} className="border rounded p-4 shadow">
                        <h2 className="text-lg font-semibold">{category.name}</h2>
                        <a
                            href={`/categories/${category._id}`}
                            className="text-blue-500 underline"
                        >
                            Açık artırmaları gör
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
