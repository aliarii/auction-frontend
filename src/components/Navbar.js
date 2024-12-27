import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Balance from "./Balance";

function Navbar({ role }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Başarıyla çıkış yaptınız!");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/products" className="hover:underline">
                        Ürünler
                    </Link>
                </li>
                {role === "admin" && (
                    <>
                        <li>
                            <Link to="/add-product" className="hover:underline">
                                Ürün Ekle
                            </Link>
                        </li>
                        <li>
                            <Link to="/expired-products" className="hover:underline">
                                Süresi Bitmiş Ürünler
                            </Link>
                        </li>
                    </>
                )}
                <li>
                    <button onClick={handleLogout} className="hover:underline">
                        Çıkış Yap
                    </button>
                </li>
                <Balance />
            </ul>
        </nav>
    );
}

export default Navbar;
