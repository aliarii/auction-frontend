import { useState } from "react";
import { addProduct } from "../../services/productService";
import { validateProductForm } from "../../utils/validateForm";
import { useError } from "../../contexts/ErrorContext";

function AddProduct() {
    const { showError } = useError(); // Hata göstermek için context'i kullanıyoruz
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        image: "",
    });
    const [errors, setErrors] = useState({}); // Validasyon hatalarını tutar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateProductForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addProduct(formData);
            alert("Ürün başarıyla eklendi!");
            setFormData({
                name: "",
                description: "",
                quantity: 1,
                image: "",
            });
            setErrors({});
        } catch (err) {
            console.error(err);
            showError("Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Yeni Ürün Ekle</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold">Ürün Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Adet</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm">{errors.quantity}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Görsel URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Kaydet
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
