import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";

function Users() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Kullanıcılar yüklenemedi:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kullanıcı Yönetimi</h1>
            <input
                type="text"
                placeholder="Kullanıcı adı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            {filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user._id} className="border-b py-2">
                            <h2 className="font-bold">{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Rol: {user.role}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Kullanıcı bulunamadı.</p>
            )}
        </div>
    );
}

export default Users;
