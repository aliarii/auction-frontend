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
    { name: "Personal Info", element: <PersonalInfo /> },
    {
      name: "Auctions",
      element: <AuctionsInfo />,
    },
    { name: "Bids", element: <BidsInfo /> },
    { name: "Won Auctions", element: <WonAuctionsInfo /> },
  ];

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const [selectedSetting, setSelectedSetting] = useState(settings[0]);
  useEffect(() => {
    dispatch(getUserProfile(localStorage.getItem("token")));
  }, []);

  return (
    <div className="flex flex-col md:flex-row self-center size-full max-w-6xl p-2 gap-2 overflow-auto">
      {/* Left Side */}
      <div className="flex flex-row sm:flex-col h-fit sm:h-full w-full sm:w-72 sm:max-w-72 p-2 gap-2 bg-white shadow-md rounded-lg overflow-auto">
        <div className="hidden sm:flex flex-col justify-center items-center w-full">
          <AccountCircleIcon sx={{ fontSize: 90 }} className="text-light-7" />
          <span className="font-medium text-lg">
            {userProfile?.name.toUpperCase()}{" "}
            {userProfile?.surname.toUpperCase()}
          </span>
        </div>
        {/* <hr className="w-full border-green-200 border" /> */}
        {/* <HorizontalLine /> */}
        <div className="hidden sm:block py-0.5 rounded-full bg-green-400" />

        <div className="flex flex-row sm:flex-col w-full gap-2">
          {settings.map((setting, idx) => (
            <div
              key={idx}
              className={`relative flex flex-row w-full p-2 ${selectedSetting.name === setting.name ? "bg-green-200" : ""} hover:bg-green-200 rounded-md cursor-pointer`}
              onClick={() => setSelectedSetting(setting)}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {setting.name}
              </span>
              {selectedSetting.name === setting.name && (
                <div className="hidden sm:inline-block absolute right-0">
                  <ChevronRightIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg bg-white shadow-md overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="font-medium">{selectedSetting.name}</h1>
        </div>
        {/* <hr className="w-full border-green-200 border" /> */}
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

      <div className="flex flex-col size-full p-2 rounded-md text-lg ">
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Name:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="name"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full py-3 px-3 border border-light-10 outline-none  rounded-lg"
              placeholder="Name"
              value={userProfile?.name || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Surname:
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
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Username:
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
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Email:
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
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Address:
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
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Phone:
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
          <dt className="table-cell w-[35%] px-4 py-3 align-middle border-r-2 text-right border-green-200 ">
            Bid Limit:
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

  return (
    <div className="flex flex-col size-full ">
      {sortedAuctions.length === 0 ? (
        <p className="text-center ">Not found.</p>
      ) : (
        <div>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-9 py-2">#</th>
              </tr>
            </thead>
            <tbody>
              {sortedAuctions.map((auction) => (
                <tr key={auction._id} className="border-t">
                  <td className="px-4 py-3">{auction.name}</td>
                  <td className="px-4 py-3">
                    {new Date(auction.auctionStartTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{auction.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/auction/${auction._id}`}
                      className="px-3 py-2 text-white font-medium bg-info rounded-md"
                    >
                      View
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
    <div className="flex flex-col size-full ">
      {sortedBids.length === 0 ? (
        <p className="text-center">Not found.</p>
      ) : (
        <div>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Bid</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-9 py-2">#</th>
              </tr>
            </thead>
            <tbody>
              {sortedBids.map((bid) => (
                <tr key={bid._id} className="border-t ">
                  <td className="px-4 py-3">{bid.auction.slice(0, 8)}</td>
                  <td className="px-4 py-3">{bid.amount} TL</td>
                  <td className="px-4 py-3">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/auction/${bid.auction}`}
                      className="px-3 py-2 text-white font-medium bg-info rounded-md"
                    >
                      View
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

const WonAuctionsInfo = () => {
  const { userProfile } = useSelector((state) => state.user);

  const [sortedAuctions, setSortedAuctions] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.auctionsWon.length > 0) {
      const auctions = [...(userProfile?.auctionsWon || [])].sort(
        (a, b) => new Date(a.auctionStartTime) - new Date(b.auctionStartTime)
      );
      setSortedAuctions(auctions);
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col size-full ">
      {sortedAuctions.length === 0 ? (
        <p className="text-center">Not found.</p>
      ) : (
        <div>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2 ">Name</th>
                <th className="px-4 py-2 ">Start Date</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-9 py-2 ">#</th>
              </tr>
            </thead>
            <tbody>
              {sortedAuctions.map((auction) => (
                <tr key={auction._id} className="border-t">
                  <td className="px-4 py-3">{auction.name}</td>
                  <td className="px-4 py-3">
                    {new Date(auction.auctionStartTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{auction.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/auction/${auction._id}`}
                      className="px-3 py-2 text-white font-medium bg-info rounded-md"
                    >
                      View
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
