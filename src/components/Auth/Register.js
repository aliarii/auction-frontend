import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user", // Varsayılan olarak "user"
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
            navigate("/login"); // Giriş sayfasına yönlendir
        } catch (err) {
            console.error(err);
            alert("Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Kullanıcı Adı:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Kullanıcı adınızı giriniz"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">E-posta:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="E-posta adresinizi giriniz"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Şifre:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Şifrenizi giriniz"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Kayıt Ol
                    </button>
                </form>
                <p className="text-center mt-4">
                    Zaten bir hesabınız var mı?{" "}
                    <a href="/login" className="text-blue-500 hover:underline transition">
                        Giriş Yap
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
