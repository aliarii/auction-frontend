import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function ConfirmModal({ isVisible, onClose, onConfirm, data }) {
  if (!isVisible) return null; // Modal görünür değilse hiçbir şey render etme
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative flex w-96 flex-col items-center justify-center gap-2 rounded-lg bg-white p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          className="absolute right-2 top-2 cursor-pointer"
          fontSize="large"
          onClick={onClose}
        />
        <div className="flex min-h-48 w-full flex-col items-center justify-center gap-2">
          <h2 className="font-medium">{data?.title}</h2>
          <h2 className="font-medium">{data?.message}</h2>
        </div>
        <div className="flex w-full flex-row gap-2 p-2">
          <button
            onClick={onClose}
            className={`w-full rounded-lg bg-danger p-2 text-white`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`w-full rounded-lg bg-green-500 p-2 text-white`}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
