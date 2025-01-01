import React from "react";
import { useSelector } from "react-redux";
function CustomModal({ isVisible, onClose, message }) {
  if (!isVisible) return null; // Modal görünür değilse hiçbir şey render etme
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-center text-xl font-bold mb-4">
          {message.message}
        </h2>
        <button
          onClick={onClose}
          className={`w-full ${message.success ? "bg-success" : "bg-danger"}  text-white p-2 rounded`}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

export default CustomModal;
