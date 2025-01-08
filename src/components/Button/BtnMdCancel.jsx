import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const BtnMdCancel = ({ clickEvent, btnText }) => {
  return (
    <div
      className="flex justify-center items-center px-2 h-6 gap-1 rounded-lg cursor-pointer outline-none select-none text-light-1 bg-danger"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">İptal</h2>
      <CloseIcon fontSize="small" />
    </div>
  );
};

export default BtnMdCancel;
