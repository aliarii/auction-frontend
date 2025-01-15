import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const BtnMdEdit = ({ handleClick }) => {
  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center gap-1 rounded-lg bg-info px-2 py-1 text-light-1 outline-none"
      onClick={handleClick}
    >
      <h2 className="font-semibold">Edit</h2>
      <EditIcon fontSize="small" />
    </div>
  );
};

export default BtnMdEdit;
