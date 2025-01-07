import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function ConfirmModal({ isVisible, onClose, onConfirm, message }) {
  if (!isVisible) return null; // Modal görünür değilse hiçbir şey render etme
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col justify-center items-center w-96 gap-2 p-2 bg-white rounded-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          className="absolute right-2 top-2 text-dark-8 cursor-pointer"
          fontSize="large"
          onClick={onClose}
        />
        <div className="flex items-center justify-center min-h-48 w-full">
          <h2 className="text-xl font-bold">{message}</h2>
        </div>
        <div className="flex flex-row gap-1 w-full">
          <button
            onClick={onClose}
            className={`w-full bg-danger text-white p-2 rounded`}
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className={`w-full bg-success text-white p-2 rounded`}
          >
            Onay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
