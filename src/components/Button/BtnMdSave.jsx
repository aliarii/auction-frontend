import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const BtnMdSave = ({ clickEvent }) => {
  return (
    <div
      className="flex justify-center items-center px-2 h-6 gap-1 rounded-lg cursor-pointer text-light-1 bg-success"
      onClick={clickEvent}
    >
      <h2 className="font-semibold">Kaydet</h2>
      <SaveIcon fontSize="small" />
    </div>
  );
};

export default BtnMdSave;
