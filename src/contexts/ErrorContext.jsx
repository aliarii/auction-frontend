import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState("");

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(""), 5000); // 5 saniye sonra hata mesajını temizler
    };

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
