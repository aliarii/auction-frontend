import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token); // JWT'yi sakla
            alert("Giriş başarılı!");
            navigate("/products"); // Ürünler sayfasına yönlendir
        } catch (err) {
            console.error(err);
            alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">E-posta:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="E-posta adresinizi giriniz"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Şifrenizi giriniz"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Giriş Yap
                    </button>
                </form>
                <p className="text-center mt-4">
                    Hesabınız yok mu?{" "}
                    <a
                        href="/register"
                        className="text-blue-500 hover:underline transition"
                    >
                        Kayıt Ol
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
