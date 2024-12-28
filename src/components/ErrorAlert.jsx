import { useError } from "../contexts/ErrorContext";

function ErrorAlert() {
    const { error } = useError();

    if (!error) return null;

    return (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
            <p>{error}</p>
        </div>
    );
}

export default ErrorAlert;
