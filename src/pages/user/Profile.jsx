import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../services/userService";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bidLimit: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error("Profil yüklenemedi:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            await updateUserProfile(profile);
            alert("Profil başarıyla güncellendi!");
        } catch (error) {
            console.error("Profil güncellenemedi:", error);
            alert("Bir hata oluştu.");
        }
    };

    if (loading) {
        return <p>Profil yükleniyor...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profilim</h1>
            <div className="mb-4">
                <label className="block font-semibold">Ad</label>
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Email</label>
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Teklif Limiti</label>
                <input
                    type="number"
                    value={profile.bidLimit}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>
            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Güncelle
            </button>
        </div>
    );
}

export default Profile;
