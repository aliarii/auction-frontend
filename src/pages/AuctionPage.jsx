import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionDetails from "../components/Auction/AuctionDetails";
import HighestBidCard from "../components/Bid/HighestBidCard";
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
const socket = io("http://localhost:5000");

function AuctionPage() {
  const { auctionId } = useParams();
  const { auction, isLoading } = useSelector((state) => state.auction);
  const { bid } = useSelector((state) => state.bid);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      console.log("closeAuction event received:", completedAuction);
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
      dispatch(getAuctionById(auctionId));
    }
  }, [dispatch, auctionId]);

  // useEffect(() => {
  //   if (auction) {
  //     console.log("auction", auction);
  //   }
  // }, [auction]);

  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime);
      setTimeLeft(newTimeLeft);
      // console.log(auction);
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
    setShowConfirm(true); // Show confirmation modal
  };

  const setBidModal = (amount) => {
    if (bid?.auction === auctionId && bid.user === user._id) return;

    const bidAction = async () => {
      const result = await dispatch(
        createBid({
          auctionId,
          userId: user._id,
          amount: amount + (bid?.amount || auction.startingPrice || 0),
        })
      );
      if (result.error) {
        setInfoData({
          title: "Teklif başarısız oldu.",
          success: false,
        });
        setShowInfo(true);
      } else {
        setInfoData({
          title: "Teklif başarıyla verildi.",
          success: true,
        });
        setShowInfo(true);
      }
    };
    setConfirmAction(() => bidAction);
    setShowConfirm(true); // Show confirmation modal
  };

  const setEndModal = (winnerBid) => {
    if (winnerBid.user === user._id)
      setInfoData({
        title: "Açık Arttırma Sona Erdi.",
        message: "Tebrikler! Kazandınız.",
        success: true,
      });
    else
      setInfoData({
        title: "Açık Arttırma Sona Erdi.",
        message: "Kazanamadınız.",
        success: false,
      });
    setShowInfo(true);
  };

  const confirmHandler = () => {
    if (confirmAction) {
      confirmAction(); // Call the confirmed action
    }
    setShowConfirm(false); // Hide the confirmation modal after confirmation
  };

  const cancelHandler = () => {
    setShowConfirm(false); // Just close the modal without doing anything
  };

  return (
    <div className="flex flex-col self-center size-full max-w-6xl p-2 gap-1 overflow-auto">
      <HighestBidCard />

      <div className="flex flex-row size-full gap-1 overflow-auto">
        {/* Left Side */}

        <div className="flex flex-col size-full gap-1 overflow-auto">
          <div className="h-fit w-full p-2 rounded-lg bg-dark-2">
            <div className="h-fit w-full">
              <ProductImages product={auction?.product} showPreviews={true} />
            </div>
          </div>
          <ProductDetails />
        </div>

        {/* Middle */}
        <div className="flex flex-col size-full gap-1 overflow-auto">
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
          <AuctionDetails />
        </div>

        {/* Right Side */}
        <div className="flex flex-col size-full max-w-80  p-2 gap-1 bg-dark-2 rounded-lg overflow-auto">
          <h1 className="text-lg text-light-2 font-semibold text-center">
            Son Teklifler
          </h1>
          <HorizontalLine />
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
        message={"İşlemi onaylıyor musunuz?"}
      />
    </div>
  );
}

export default AuctionPage;

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

  useEffect(() => {
    if (bid && bid.auction === auctionId) setUserId(bid.user);
  }, [auctionId, bid]);

  useEffect(() => {
    if (auction && auction.currentHighestBid)
      setUserId(auction.currentHighestBid.user);
  }, [auction]);

  return (
    <>
      <div className="flex flex-col h-fit w-full p-2 gap-1 rounded-lg bg-dark-2">
        <h1 className="text-lg text-light-2 font-semibold text-center">
          Teklif Ver
        </h1>
        <HorizontalLine />
        {user.auctions?.includes(auctionId) ? (
          <>
            <div
              className={`${userId === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg`}
              onClick={() => setBidModal(1000)}
            >
              <h1 className="text-center font-semibold text-light-2">
                + 1000 TL
              </h1>
            </div>
            <div
              className={`${userId === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg `}
              onClick={() => setBidModal(2000)}
            >
              <h1 className="text-center font-semibold text-light-2">
                + 2000 TL
              </h1>
            </div>
          </>
        ) : (
          <div
            className="bg-success p-3 rounded-lg cursor-pointer"
            onClick={setJoinModal}
          >
            <h1 className="text-center font-semibold text-light-2">
              Açık Arttırmaya Katıl
            </h1>
          </div>
        )}
      </div>

      <div className="flex flex-col h-fit w-full p-2 gap-1 rounded-lg bg-dark-2">
        <h1 className="text-lg text-light-2 font-semibold text-center">
          Kalan Süre
        </h1>
        <HorizontalLine />
        <h1 className="text-center font-semibold text-light-2">{timeLeft}</h1>
      </div>
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
