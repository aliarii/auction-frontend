import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionDetails from "../components/Auction/AuctionDetails";
import PreviousBids from "../components/Bid/PreviousBids";
import HorizontalLine from "../components/HorizontalLine";
import Loading from "../components/Loading";
import ConfirmModal from "../components/Modal/ConfirmModal";
import InfoModal from "../components/Modal/InfoModal";
import ProductDetails from "../components/Product/ProductDetails";
import ProductImages from "../components/Product/ProductImages";
import { getAuctionById } from "../store/slices/auctionSlice";
import { createBid, getBidById } from "../store/slices/bidSlice";
import { joinAuction } from "../store/slices/userSlice";
import { calculateTimeLeft } from "../utils/timeUtils";
import { highestBid } from "../utils/highestBid";
const socket = io(import.meta.env.VITE_API_BASE_URL);

function AuctionPage() {
  const { auctionId } = useParams();
  const { auction, isLoading } = useSelector((state) => state.auction);
  const { bid } = useSelector((state) => state.bid);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  const [showInfo, setShowInfo] = useState(false);
  const [infoAction, setInfoAction] = useState(null);
  const [infoData, setInfoData] = useState(null);

  useEffect(() => {
    socket.emit("joinAuction", auctionId);
    socket.on("closeAuction", (completedAuction) => {
      if (completedAuction.auction._id === auctionId) {
        handleAuctionEnd(completedAuction);
      }
    });

    return () => {
      socket.off("closeAuction");
    };
  }, [auctionId]);

  const handleAuctionEnd = async (completedAuction) => {
    await dispatch(getAuctionById(completedAuction.auction._id));
    dispatch(getBidById(completedAuction.auction.currentHighestBid)).then(
      (data) => {
        if (data.payload.success) {
          setEndModal(data.payload.data.bid);
        }
      },
    );
  };

  useEffect(() => {
    if (auctionId) {
      dispatch(getAuctionById(auctionId)).then((data) => {
        if (data.error) navigate("/");
      });
    }
  }, [dispatch, auctionId]);

  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime);
      setTimeLeft(newTimeLeft);
    }
  }, [auction]);

  useEffect(() => {
    if (auction && auction.auctionEndTime) {
      calcTimeLeftMemo();
      const interval = setInterval(() => {
        calcTimeLeftMemo();
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [auction, calcTimeLeftMemo]);

  if (isLoading) {
    return <Loading />;
  }

  const setJoinModal = () => {
    const joinAction = async () => {
      const reqData = {
        userId: user._id,
        auctionId: auctionId,
      };
      dispatch(joinAuction(reqData));
    };
    setConfirmAction(() => joinAction);
    setConfirmMessage({
      message: "Do you want to join?",
    });
    setShowConfirm(true);
  };

  const setBidModal = (amount, willAdd) => {
    if (bid?.auction === auctionId && bid.user === user._id) return;

    const newOffer =
      Number.parseInt(amount) +
      (willAdd ? bid?.amount || auction.startingPrice || 0 : 0);

    const bidAction = async () => {
      const result = await dispatch(
        createBid({
          auctionId,
          userId: user._id,
          amount: newOffer,
        }),
      );
      if (result.error) {
        setInfoData({
          title: "Rejected.",
          success: false,
        });
        setShowInfo(true);
      } else {
        setInfoData({
          title: "Successful.",
          success: true,
        });
        setShowInfo(true);
      }
    };
    setConfirmMessage({
      title: "Do you confirm the transaction?",
      message: `Bid amount: ${newOffer} TL`,
    });
    setConfirmAction(() => bidAction);
    setShowConfirm(true); // Show confirmation modal
  };

  const setEndModal = (winnerBid) => {
    if (winnerBid.user === user._id)
      setInfoData({
        title: "Auction Ended.",
        message: "Congratulations! You Won.",
        success: true,
      });
    else
      setInfoData({
        title: "Auction Ended.",
        message: "You Lost.",
        success: false,
      });
    setShowInfo(true);
  };

  const confirmHandler = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirm(false);
  };

  const cancelHandler = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex size-full max-w-6xl flex-col gap-1 self-center p-2">
      <div className="flex flex-row items-center gap-2 text-sm">
        <Link to={"/"}>Home</Link>
        <span>{">"}</span>
        <Link to={"/auctions"}>Auctions</Link>
        <span>{">"}</span>
        <Link>{auction?.name}</Link>
      </div>

      <div className="flex size-full flex-col gap-2 sm:flex-row">
        {/* Left Side */}
        <div className="flex w-full flex-col gap-2 sm:w-[60%]">
          <div className="flex h-fit flex-col gap-1 rounded-lg border bg-white p-2 shadow-sm sm:min-h-[640px]">
            <h1>Images</h1>
            <HorizontalLine />
            <ProductImages product={auction?.product} showPreviews={true} />
          </div>
          <ProductDetails />
        </div>

        {/* Right Side */}

        <div className="flex h-full w-full flex-col gap-2 sm:w-[40%]">
          <AuctionDetails />
          <div className="flex h-fit w-full flex-col gap-2 rounded-lg border bg-white px-2 py-6 shadow-sm">
            <HighestBidCard />
            {auction?.status === "Active" ? (
              <ActiveAuctionController
                auctionId={auctionId}
                setBidModal={setBidModal}
                setJoinModal={setJoinModal}
                timeLeft={timeLeft}
              />
            ) : auction?.status === "Pending" ? (
              <PendingAuctionController />
            ) : (
              <ClosedAuctionController />
            )}
          </div>
          <PreviousBids />
        </div>
      </div>
      <InfoModal
        isVisible={showInfo}
        onClose={() => setShowInfo(false)}
        data={infoData}
      />
      <ConfirmModal
        isVisible={showConfirm}
        onClose={cancelHandler}
        onConfirm={confirmHandler}
        data={confirmMessage}
      />
    </div>
  );
}

export default AuctionPage;

const HighestBidCard = () => {
  const { auction } = useSelector((state) => state.auction);
  const [bid, setBid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction) {
      if (auction.currentHighestBid) {
        dispatch(getBidById(auction.currentHighestBid._id)).then(
          ({ payload }) => {
            setBid(payload.data.bid);
          },
        );
      } else {
        setBid({ amount: auction.startingPrice, auction: auction._id });
      }
    }
  }, [auction, dispatch]);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-3xl font-semibold text-green-500">
          {highestBid({ bid, auction })}
        </span>
        <span>Highest Bid</span>
      </div>
      <table className="w-full table-fixed whitespace-nowrap text-center text-sm">
        <thead>
          <tr>
            <th className="px-4">{auction?.minimumBidInterval || 0} TL</th>
            <th className="px-4">{auction?.bids?.length || 0}</th>
            <th className="px-4">
              {auction?.currentHighestBid?._id?.slice(0, 8) || "-"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4">Price Interval</td>
            <td className="px-4"> Bids</td>
            <td className="px-4"> Highest Bid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ActiveAuctionController = ({
  auctionId,
  setJoinModal,
  setBidModal,
  timeLeft,
}) => {
  const { auction } = useSelector((state) => state.auction);
  const { user } = useSelector((state) => state.user);
  const { bid } = useSelector((state) => state.bid);
  const [userId, setUserId] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    if (bid && bid.auction === auctionId) setUserId(bid.user);
  }, [auctionId, bid]);

  useEffect(() => {
    if (auction && auction.currentHighestBid)
      setUserId(auction.currentHighestBid.user);
  }, [auction]);

  const handleValueChange = (e) => {
    let value = e.target.value;
    if (value < 0) value = 0;
    setBidAmount(value);
  };
  return (
    <>
      <hr className="w-full border border-green-200" />
      <h1 className="text-center font-semibold">{timeLeft}</h1>
      <h1 className="text-center">Time Left</h1>
      <hr className="w-full border border-green-200" />
      <span className="text-center font-medium">Offer</span>

      {user.auctions?.includes(auctionId) ? (
        <>
          <div className="flex w-full flex-row items-center justify-center gap-1">
            <button
              className={`${userId === user._id ? "cursor-not-allowed bg-gray-300" : "bg-green-500 text-white"} rounded-lg p-2`}
              onClick={() => setBidModal(1000, true)}
            >
              + 1000 TL
            </button>
            <button
              className={`${userId === user._id ? "cursor-not-allowed bg-gray-300" : "bg-green-500 text-white"} rounded-lg p-2`}
              onClick={() => setBidModal(2000, true)}
            >
              + 2000 TL
            </button>
          </div>
          <div className="flex w-[20%] flex-row items-center justify-center gap-2 self-center">
            <hr className="w-full border border-green-200" />
            <span>Or</span>
            <hr className="w-full border border-green-200" />
          </div>

          <div className="flex flex-row gap-1">
            <input
              type="number"
              name="bidAmount"
              className="w-full rounded-lg border-2 px-3 py-2 outline-none"
              value={bidAmount}
              onChange={handleValueChange}
              onClick={(e) => e.target.select()}
              disabled={userId === user._id}
            />
            <button
              className={`${userId === user._id ? "cursor-not-allowed bg-gray-300" : "bg-green-500 text-white"} rounded-lg px-8 py-2`}
              onClick={() => setBidModal(bidAmount)}
            >
              Bid
            </button>
          </div>
        </>
      ) : (
        <button
          className="rounded-lg bg-green-500 p-2 text-lg text-white"
          onClick={setJoinModal}
        >
          Join
        </button>
      )}
    </>
  );
};

const PendingAuctionController = () => {
  return (
    <div className="flex h-[340px] w-full flex-col justify-center gap-1 rounded-lg bg-dark-2 p-2">
      <h1 className="text-center text-lg font-semibold text-light-2">
        Açık Arttırma Henüz Başlamadı.
      </h1>
    </div>
  );
};

const ClosedAuctionController = () => {
  return (
    <div className="flex h-[340px] w-full flex-col justify-center gap-1 rounded-lg bg-dark-2 p-2">
      <h1 className="text-center text-lg font-semibold text-light-2">
        Açık Arttırma Sona Erdi.
      </h1>
    </div>
  );
};
