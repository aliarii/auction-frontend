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
    <div className="flex size-full max-w-6xl flex-col gap-2 self-center overflow-auto p-2 md:flex-row">
      {/* Left Side */}
      <div className="flex h-fit w-full flex-row gap-2 overflow-auto rounded-lg bg-white p-2 shadow-md sm:h-full sm:w-72 sm:max-w-72 sm:flex-col">
        <div className="hidden w-full flex-col items-center justify-center sm:flex">
          <AccountCircleIcon sx={{ fontSize: 90 }} className="text-light-7" />
          <span className="text-lg font-medium">
            {userProfile?.name.toUpperCase()}{" "}
            {userProfile?.surname.toUpperCase()}
          </span>
        </div>
        {/* <hr className="w-full border-green-200 border" /> */}
        {/* <HorizontalLine /> */}
        <div className="hidden rounded-full bg-green-400 py-0.5 sm:block" />

        <div className="flex w-full flex-row gap-2 sm:flex-col">
          {settings.map((setting, idx) => (
            <div
              key={idx}
              className={`relative flex w-full flex-row p-2 ${selectedSetting.name === setting.name ? "bg-green-200" : ""} cursor-pointer rounded-md hover:bg-green-200`}
              onClick={() => setSelectedSetting(setting)}
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {setting.name}
              </span>
              {selectedSetting.name === setting.name && (
                <div className="absolute right-0 hidden sm:inline-block">
                  <ChevronRightIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex h-full w-full flex-col gap-2 overflow-auto rounded-lg bg-white p-2 shadow-md">
        <div className="flex w-full flex-row justify-between">
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
    <div className="flex size-full flex-col gap-2">
      <div className="w-fit place-self-end">
        {isEditing ? (
          <BtnMdCancel clickEvent={() => setIsEditing(false)} />
        ) : (
          <BtnMdEdit handleClick={() => setIsEditing(true)} />
        )}
      </div>

      <div className="flex size-full flex-col rounded-md p-2 text-lg">
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Name:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="name"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder="Name"
              value={userProfile?.name || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Surname:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="surname"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder={"Surname"}
              value={userProfile?.surname || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Username:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="username"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder={"Username"}
              value={userProfile?.username || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Email:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="email"
              name="email"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder={"Email address"}
              value={userProfile?.email || "-"}
              disabled={!isEditing}
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Address:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="address"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder={"Address"}
              value={userProfile?.address || "-"}
              disabled
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Phone:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <input
              type="text"
              name="phone"
              autoCapitalize="off"
              autoComplete="on"
              className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
              placeholder={"Phone Number"}
              value={userProfile?.phone || "-"}
              disabled
            />
          </dd>
        </dl>
        <dl className="table w-full table-fixed">
          <dt className="table-cell w-[35%] border-r-2 border-green-200 px-4 py-3 text-right align-middle">
            Bid Limit:
          </dt>
          <dd className="table-cell w-[65%] px-4 py-3 align-middle">
            <div className="flex w-full flex-row items-center gap-1">
              <input
                type="number"
                name="limit"
                autoCapitalize="off"
                autoComplete="on"
                className="w-full rounded-lg border border-light-10 px-3 py-3 outline-none"
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
        (a, b) => new Date(a.auctionStartTime) - new Date(b.auctionStartTime),
      );
      setSortedAuctions(auctions);
    }
  }, [userProfile]);

  return (
    <div className="flex size-full flex-col">
      {sortedAuctions.length === 0 ? (
        <p className="text-center">Not found.</p>
      ) : (
        <div>
          <table className="w-full table-auto text-sm">
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
                      className="rounded-md bg-info px-3 py-2 font-medium text-white"
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
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setSortedBids(bids);
    }
  }, [userProfile]);

  return (
    <div className="flex size-full flex-col">
      {sortedBids.length === 0 ? (
        <p className="text-center">Not found.</p>
      ) : (
        <div>
          <table className="w-full table-auto text-sm">
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
                <tr key={bid._id} className="border-t">
                  <td className="px-4 py-3">{bid.auction.slice(0, 8)}</td>
                  <td className="px-4 py-3">{bid.amount} TL</td>
                  <td className="px-4 py-3">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/auction/${bid.auction}`}
                      className="rounded-md bg-info px-3 py-2 font-medium text-white"
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
        (a, b) => new Date(a.auctionStartTime) - new Date(b.auctionStartTime),
      );
      setSortedAuctions(auctions);
    }
  }, [userProfile]);

  return (
    <div className="flex size-full flex-col">
      {sortedAuctions.length === 0 ? (
        <p className="text-center">Not found.</p>
      ) : (
        <div>
          <table className="w-full table-auto text-sm">
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
                      className="rounded-md bg-info px-3 py-2 font-medium text-white"
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
