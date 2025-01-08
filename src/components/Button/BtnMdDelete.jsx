import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const BtnMdDelete = ({ clickEvent }) => {
  return (
    <div
      className="flex justify-center items-center px-2 h-6 gap-1 rounded-lg cursor-pointer outline-none select-none text-light-1 bg-danger"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Sil</h2>
      <DeleteIcon fontSize="small" />
    </div>
  );
};

export default BtnMdDelete;
