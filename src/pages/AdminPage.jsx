import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useState } from "react";
import HorizontalLine from "../components/HorizontalLine";
import AuctionSettingsPage from "./AuctionSettingsPage";
import ProductSettingsPage from "./ProductSettingsPage";
import UserSettingsPage from "./UserSettingsPage";

const settings = [
  { name: "Ürün Ayarları", element: <ProductSettingsPage /> },
  { name: "Açık Arttırma Ayarları", element: <AuctionSettingsPage /> },
  { name: "Kullanıcı Ayarları", element: <UserSettingsPage /> },
];

const AdminPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(settings[0]);

  const handleNavigate = (setting) => {
    setSelectedSetting(setting);
  };
  return (
    <div className="flex flex-row size-full p-2 gap-2 overflow-auto">
      <div className="flex flex-col h-full w-72 max-w-72 p-2 gap-2 rounded-lg bg-dark-1">
        <h1 className="text-lg text-light-2 font-semibold">Ayarlar</h1>
        <HorizontalLine />

        {settings.map((item, index) => (
          <div
            className={`flex justify-between items-center py-2 cursor-pointer rounded-lg ${selectedSetting?.name === item.name ? "bg-light-4" : "text-light-2"}`}
            key={index}
            onClick={() => handleNavigate(item)}
          >
            <h2 className="mr-2 ml-2 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
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

      {/* Açık Arttırmalar */}
      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg bg-dark-1 overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg text-light-2 font-semibold">
            {selectedSetting.name}
          </h1>
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
