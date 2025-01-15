import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const BtnMdCancel = ({ clickEvent, btnText }) => {
  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center gap-1 rounded-lg bg-danger px-2 py-1 text-light-1 outline-none"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Cancel</h2>
      <CloseIcon fontSize="small" />
    </div>
  );
};

export default BtnMdCancel;
