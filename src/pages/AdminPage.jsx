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
    <div className="flex h-full w-full max-w-6xl flex-col gap-2 self-center overflow-auto p-2 sm:flex-row">
      <div className="flex h-fit w-full flex-row gap-2 overflow-auto rounded-lg bg-white p-2 shadow-md sm:h-full sm:w-72 sm:max-w-72 sm:flex-col">
        <h1 className="hidden font-medium sm:block">Settings</h1>

        <div className="hidden rounded-full bg-green-400 py-0.5 sm:block" />

        {settings.map((item, index) => (
          <div
            className={`flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-green-200 ${selectedSetting?.name === item.name ? "bg-green-200" : ""}`}
            key={index}
            onClick={() => handleNavigate(item)}
          >
            <h2 className="ml-2 mr-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {item.name}
            </h2>
            {selectedSetting?.name === item.name && (
              <div className="hidden justify-center sm:flex">
                <ChevronRightIcon />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex h-full w-full flex-col gap-2 overflow-auto rounded-lg bg-white p-2 shadow-md">
        <div className="flex w-full flex-row justify-between">
          <h1 className="font-medium">{selectedSetting.name}</h1>
        </div>
        <HorizontalLine />
        <div className="flex size-full flex-col overflow-auto">
          {selectedSetting?.element}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
