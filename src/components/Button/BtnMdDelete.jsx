import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const BtnMdDelete = ({ clickEvent }) => {
  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center gap-1 rounded-lg bg-danger px-2 py-1 text-light-1 outline-none"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Delete</h2>
      <DeleteIcon fontSize="small" />
    </div>
  );
};

export default BtnMdDelete;
