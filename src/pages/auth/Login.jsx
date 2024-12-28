import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useError } from "../../contexts/ErrorContext";
import { loginUser } from "../../services/authService";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useUser();
    const { showError } = useError();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(formData);
            login(userData); // Kullanıcıyı context'e kaydet
            navigate("/"); // Ana sayfaya yönlendirme
        } catch (err) {
            console.error(err);
            showError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Şifre</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}

export default Login;
