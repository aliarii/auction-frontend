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
      }
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
        })
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
    <div className="flex flex-col self-center size-full max-w-6xl p-2 gap-1 ">
      <div className="flex flex-row items-center gap-2 text-sm">
        <Link to={"/"}>Home</Link>
        <span>{">"}</span>
        <Link to={"/auctions"}>Auctions</Link>
        <span>{">"}</span>
        <Link>{auction?.name}</Link>
      </div>

      <div className="flex flex-col sm:flex-row size-full gap-2 ">
        {/* Left Side */}
        <div className="w-full sm:w-[60%] flex flex-col gap-2">
          <div className="flex flex-col h-fit sm:min-h-[640px] p-2 gap-1 bg-white rounded-lg border shadow-sm">
            <h1>Images</h1>
            <HorizontalLine />
            <ProductImages product={auction?.product} showPreviews={true} />
          </div>
          <ProductDetails />
        </div>

        {/* Right Side */}

        <div className="h-full w-full sm:w-[40%] flex flex-col gap-2">
          <AuctionDetails />
          <div className="flex flex-col h-fit w-full py-6 px-2 gap-2 rounded-lg bg-white shadow-sm border">
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
          }
        );
      } else {
        setBid({ amount: auction.startingPrice, auction: auction._id });
      }
    }
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <div className="flex flex-col gap-1 justify-center items-center">
        <span className="font-semibold text-3xl text-green-500">
          {highestBid({ bid, auction })}
        </span>
        <span>Highest Bid</span>
      </div>
      <table className="table-fixed w-full text-center text-sm whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4">{auction?.minimumBidInterval || 0} TL</th>
            <th className="px-4 ">{auction?.bids?.length || 0}</th>
            <th className="px-4 ">
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
      <hr className="w-full border-green-200 border" />
      <h1 className="font-semibold text-center">{timeLeft}</h1>
      <h1 className="text-center">Time Left</h1>
      <hr className="w-full border-green-200 border" />
      <span className="font-medium text-center">Offer</span>

      {user.auctions?.includes(auctionId) ? (
        <>
          <div className="flex flex-row justify-center items-center w-full gap-1">
            <button
              className={`${userId === user._id ? "bg-gray-300 cursor-not-allowed" : "text-white bg-green-500 "} p-2 rounded-lg`}
              onClick={() => setBidModal(1000, true)}
            >
              + 1000 TL
            </button>
            <button
              className={`${userId === user._id ? "bg-gray-300 cursor-not-allowed" : "text-white bg-green-500 "} p-2 rounded-lg`}
              onClick={() => setBidModal(2000, true)}
            >
              + 2000 TL
            </button>
          </div>
          <div className="flex flex-row self-center justify-center items-center w-[20%] gap-2">
            <hr className="w-full border-green-200 border" />
            <span>Or</span>
            <hr className="w-full border-green-200 border" />
          </div>

          <div className="flex flex-row gap-1">
            <input
              type="number"
              name="bidAmount"
              className="w-full py-2 px-3 border-2 outline-none rounded-lg"
              value={bidAmount}
              onChange={handleValueChange}
              onClick={(e) => e.target.select()}
              disabled={userId === user._id}
            />
            <button
              className={`${userId === user._id ? "bg-gray-300 cursor-not-allowed" : "text-white bg-green-500 "} py-2 px-8 rounded-lg`}
              onClick={() => setBidModal(bidAmount)}
            >
              Bid
            </button>
          </div>
        </>
      ) : (
        <button
          className="p-2 text-lg text-white bg-green-500 rounded-lg"
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
    <div className="flex flex-col justify-center h-[340px] w-full p-2 gap-1 rounded-lg bg-dark-2">
      <h1 className="text-lg text-light-2 font-semibold text-center">
        Açık Arttırma Henüz Başlamadı.
      </h1>
    </div>
  );
};

const ClosedAuctionController = () => {
  return (
    <div className="flex flex-col justify-center h-[340px] w-full p-2 gap-1 rounded-lg bg-dark-2">
      <h1 className="text-lg text-light-2 font-semibold text-center">
        Açık Arttırma Sona Erdi.
      </h1>
    </div>
  );
};
