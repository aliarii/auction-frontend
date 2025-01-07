import React from "react";
function InfoModal({ isVisible, onClose, message, success }) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-center text-xl font-bold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className={`w-full ${success ? "bg-success" : "bg-danger"}  text-white p-2 rounded`}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
