import { useState } from "react";
import { addAuction } from "../../services/auctionService";
import { validateAuctionForm } from "../../utils/validateForm";
import { useError } from "../../contexts/ErrorContext";

function AddAuction() {
    const { showError } = useError(); // Hata göstermek için context'i kullanıyoruz
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        productId: "",
        startingPrice: 0,
        categoryId: "",
    });
    const [errors, setErrors] = useState({}); // Validasyon hatalarını tutar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateAuctionForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addAuction(formData);
            alert("Açık artırma başarıyla başlatıldı!");
            setFormData({
                title: "",
                description: "",
                productId: "",
                startingPrice: 0,
                categoryId: "",
            });
            setErrors({});
        } catch (err) {
            console.error(err);
            showError(
                "Açık artırma başlatılırken bir hata oluştu. Lütfen tekrar deneyin."
            );
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Yeni Açık Artırma Başlat</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
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
                    <label className="block font-semibold">Başlangıç Fiyatı</label>
                    <input
                        type="number"
                        name="startingPrice"
                        value={formData.startingPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.startingPrice && (
                        <p className="text-red-500 text-sm">{errors.startingPrice}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Başlat
                </button>
            </form>
        </div>
    );
}

export default AddAuction;
