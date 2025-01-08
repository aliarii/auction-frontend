import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import BtnMdEdit from "../components/Button/BtnMdEdit";
import HorizontalLine from "../components/HorizontalLine";
import { getUserProfile } from "../store/slices/userSlice";

const ProfilePage = () => {
  const settings = [
    { name: "Kişisel Bilgiler", element: <PersonalInfo /> },
    {
      name: "Açık Arttırmalar",
      element: <AuctionsInfo />,
    },
    { name: "Teklifler", element: <BidsInfo /> },
  ];

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const [selectedSetting, setSelectedSetting] = useState(settings[0]);
  useEffect(() => {
    dispatch(getUserProfile(localStorage.getItem("token")));
  }, []);

  return (
    <div className="flex flex-row self-center size-full max-w-6xl p-2 gap-2 overflow-auto">
      {/* Left Side */}
      <div className="flex flex-col h-full min-w-72 w-72 max-w-72 p-2 gap-2 rounded-lg bg-dark-1">
        <div className="flex flex-col justify-center items-center w-full">
          <AccountCircleIcon sx={{ fontSize: 90 }} className="text-light-7" />
          <span className="font-bold text-lg text-light-2">
            {userProfile?.name.toUpperCase()}{" "}
            {userProfile?.surname.toUpperCase()}
          </span>
        </div>
        <HorizontalLine />
        <div className="flex flex-col w-full gap-2">
          {settings.map((setting, idx) => (
            <div
              key={idx}
              className="relative flex flex-row bg-light-7 rounded-md font-semibold w-full p-2 cursor-pointer"
              onClick={() => setSelectedSetting(setting)}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {setting.name}
              </span>
              {selectedSetting.name === setting.name && (
                <ChevronRightIcon className="absolute right-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg bg-dark-1 overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg text-light-2 font-semibold">
            {selectedSetting.name}
          </h1>
        </div>
        <HorizontalLine />
        {selectedSetting.element}
      </div>
    </div>
  );
};

export default ProfilePage;

const PersonalInfo = () => {
  const { userProfile } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex flex-col gap-2 size-full">
      <div className="place-self-end w-fit">
        {isEditing ? (
          <BtnMdCancel clickEvent={() => setIsEditing(false)} />
        ) : (
          <BtnMdEdit handleClick={() => setIsEditing(true)} />
        )}
      </div>

      <div className="flex flex-col size-full p-2 bg-light-8 rounded-md font-semibold text-lg text-dark-7">
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Ad:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="name"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none  rounded-lg"
              placeholder={"Name"}
              value={userProfile?.name || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Soyad:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="surname"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
              placeholder={"Surname"}
              value={userProfile?.surname || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Kullanıcı Adı:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="username"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
              placeholder={"Username"}
              value={userProfile?.username || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Eposta:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="email"
              name="email"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
              placeholder={"Email address"}
              value={userProfile?.email || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Adres:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="address"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
              placeholder={"Address"}
              value={userProfile?.address || "-"}
              disabled
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Telefon:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="phone"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
              placeholder={"Phone Number"}
              value={userProfile?.phone || "-"}
              disabled
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-dark-1 ">
            Bakiye:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <div className="flex flex-row w-full items-center gap-1">
              <input
                type="number"
                name="limit"
                autoCapitalize="off"
                autoComplete="on"
                className="w-full py-3 px-3 border border-light-10 outline-none rounded-lg"
                placeholder={"limit"}
                value={userProfile?.bidLimit || 0}
                disabled
              />
              <label> TL</label>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
};

const AuctionsInfo = () => {
  const { userProfile } = useSelector((state) => state.user);

  const [sortedAuctions, setSortedAuctions] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.auctions.length > 0) {
      const auctions = [...(userProfile?.auctions || [])].sort(
        (a, b) => new Date(a.auctionStartTime) - new Date(b.auctionStartTime)
      );
      setSortedAuctions(auctions);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      console.log("userProfile", userProfile);
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col size-full p-2 bg-light-8 rounded-md font-semibold text-lg text-dark-7">
      {sortedAuctions.length === 0 ? (
        <p className="text-center text-light-2">Kayıt Bulunamadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm text-dark-7">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Başlık
                </th>

                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Başlangıç Tarihi
                </th>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Durum
                </th>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAuctions.map((auction) => (
                <tr
                  key={auction._id}
                  className="border-t border-light-10 hover:bg-light-9"
                >
                  <td className="px-4 py-2">{auction.name}</td>
                  <td className="px-4 py-2">
                    {new Date(auction.auctionStartTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {auction.status === "Active"
                      ? "Aktif"
                      : auction.status === "Pending"
                        ? "Bekleyen"
                        : "Biten"}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/auction/${auction._id}`}
                      className="px-4 py-2 text-white bg-info rounded-md"
                    >
                      Görüntüle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const BidsInfo = () => {
  const { userProfile } = useSelector((state) => state.user);
  const [sortedBids, setSortedBids] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.bids.length > 0) {
      const bids = [...(userProfile?.bids || [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedBids(bids);
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col size-full p-2 bg-light-8 rounded-md font-semibold text-lg text-dark-7">
      {sortedBids.length === 0 ? (
        <p className="text-center text-light-2">Kayıt Bulunamadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm text-dark-7">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Id
                </th>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Teklif Miktarı
                </th>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  Tarih
                </th>
                <th className="px-4 py-2 text-left font-semibold text-light-2">
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBids.map((bid) => (
                <tr
                  key={bid._id}
                  className="border-t border-light-10 hover:bg-light-9"
                >
                  <td className="px-4 py-2">{bid.auction}</td>
                  <td className="px-4 py-2">{bid.amount} TL</td>
                  <td className="px-4 py-2">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/auction/${bid.auction}`}
                      className="px-4 py-2 text-white bg-info rounded-md"
                    >
                      Görüntüle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
