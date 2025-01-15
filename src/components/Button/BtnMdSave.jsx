import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const BtnMdSave = ({ clickEvent }) => {
  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center gap-1 rounded-lg bg-success px-2 py-1 text-light-1 outline-none"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Save</h2>
      <SaveIcon fontSize="small" />
    </div>
  );
};

export default BtnMdSave;
