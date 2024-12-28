import { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: "",
        type: "info",
    });

    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: "", type: "info" });
        }, 3000); // 3 saniye sonra otomatik kaybolur
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Notification message={notification.message} type={notification.type} />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
