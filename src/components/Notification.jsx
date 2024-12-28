import { useState, useEffect } from "react";

function Notification({ message, type, duration = 3000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!message || !visible) return null;

    const styles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
    };

    return (
        <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${styles[type] || styles.info
                }`}
        >
            {message}
        </div>
    );
}

export default Notification;
