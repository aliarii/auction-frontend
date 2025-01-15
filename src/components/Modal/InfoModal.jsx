import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function InfoModal({ isVisible, onClose, data }) {
  if (!isVisible) return null;
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
        <div className="flex min-h-48 w-full items-center justify-center">
          <h2 className="font-medium">{data?.title}</h2>
          <h2 className="font-medium">{data?.message}</h2>
        </div>
        {/* <h2 className="text-center font-medium mb-4">{data?.title}</h2> */}
        <div className="flex w-full flex-row gap-2 p-2">
          <button
            onClick={onClose}
            className={`w-full ${data?.success ? "bg-green-500" : "bg-danger"} rounded-lg p-2 text-white`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
