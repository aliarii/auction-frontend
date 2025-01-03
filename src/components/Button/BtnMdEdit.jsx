import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const BtnMdEdit = ({ handleClick }) => {
  return (
    <div
      className="flex justify-center items-center px-2 h-6 gap-1 rounded-lg cursor-pointer text-light-1 bg-info"
      onClick={handleClick}
    >
      <h2 className="font-semibold">Düzenle</h2>
      <EditIcon fontSize="small" />
    </div>
  );
};

export default BtnMdEdit;
