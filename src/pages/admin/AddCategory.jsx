import { useState } from "react";
import { addCategory } from "../../services/categoryService";
import { validateCategoryForm } from "../../utils/validateForm";
import { useError } from "../../contexts/ErrorContext";
import { useNotification } from "../../contexts/NotificationContext";
function AddCategory() {
    const { showNotification } = useNotification();
    const { showError } = useError(); // Hata göstermek için context'i kullanıyoruz
    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });
    const [errors, setErrors] = useState({}); // Validasyon hatalarını tutar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateCategoryForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addCategory(formData);
            alert("Kategori başarıyla eklendi!");
            showNotification("Kategori başarıyla eklendi!", "success");
            setFormData({
                name: "",
                image: "",
            });
            setErrors({});
        } catch (err) {
            console.error(err);
            showError("Kategori eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
            showNotification("Kategori eklenirken bir hata oluştu.", "error");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Yeni Kategori Ekle</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold">Kategori Adı</label>
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

export default AddCategory;
