import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useState } from "react";
import HorizontalLine from "../components/HorizontalLine";
import AuctionSettingsPage from "./AuctionSettingsPage";
import ProductSettingsPage from "./ProductSettingsPage";
import UserSettingsPage from "./UserSettingsPage";

const settings = [
  { name: "Product Settings", element: <ProductSettingsPage /> },
  { name: "Auction Settings", element: <AuctionSettingsPage /> },
  { name: "User Settings", element: <UserSettingsPage /> },
];

const AdminPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(settings[0]);

  const handleNavigate = (setting) => {
    setSelectedSetting(setting);
  };
  return (
    <div className="flex flex-row self-center h-full w-full max-w-6xl p-2 gap-2 overflow-auto">
      <div className="flex flex-col h-full w-72 max-w-72 p-2 gap-2 bg-white shadow-md rounded-lg">
        <h1 className="font-medium">Settings</h1>
        <HorizontalLine />

        {settings.map((item, index) => (
          <div
            className={`flex justify-between items-center py-2 cursor-pointer rounded-lg hover:bg-green-200 ${selectedSetting?.name === item.name ? "bg-green-200" : ""}`}
            key={index}
            onClick={() => handleNavigate(item)}
          >
            <h2 className="mr-2 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.name}
            </h2>
            {selectedSetting?.name === item.name && (
              <div className="flex justify-center">
                <ChevronRightIcon />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg bg-white shadow-md overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="font-medium">{selectedSetting.name}</h1>
        </div>
        <HorizontalLine />
        <div className="flex flex-col size-full overflow-auto">
          {selectedSetting?.element}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
