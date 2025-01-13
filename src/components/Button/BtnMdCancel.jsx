import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const BtnMdCancel = ({ clickEvent, btnText }) => {
  return (
    <div
      className="flex justify-center items-center py-1 px-2 gap-1 rounded-lg cursor-pointer outline-none select-none text-light-1 bg-danger"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Cancel</h2>
      <CloseIcon fontSize="small" />
    </div>
  );
};

export default BtnMdCancel;
