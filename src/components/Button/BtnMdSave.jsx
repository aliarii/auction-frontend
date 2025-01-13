import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const BtnMdSave = ({ clickEvent }) => {
  return (
    <div
      className="flex justify-center items-center py-1 px-2 gap-1 rounded-lg cursor-pointer outline-none select-none text-light-1 bg-success"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Save</h2>
      <SaveIcon fontSize="small" />
    </div>
  );
};

export default BtnMdSave;
