import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const BtnMdEdit = ({ handleClick }) => {
  return (
    <div
      className="flex justify-center items-center py-1 px-2 gap-1 rounded-lg cursor-pointer outline-none select-none text-light-1 bg-info"
      onClick={handleClick}
    >
      <h2 className="font-semibold">Edit</h2>
      <EditIcon fontSize="small" />
    </div>
  );
};

export default BtnMdEdit;
