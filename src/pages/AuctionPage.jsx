import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuctionDetails from "../components/Auction/AuctionDetails";
import HighestBidCard from "../components/Bid/HighestBidCard";
import PreviousBids from "../components/Bid/PreviousBids";
import CustomModal from "../components/CustomModal";
import HorizontalLine from "../components/HorizontalLine";
import Loading from "../components/Loading";
import ConfirmModal from "../components/Modal/ConfirmModal";
import ProductDetails from "../components/Product/ProductDetails";
import ProductImages from "../components/Product/ProductImages";
import { getAuctionById } from "../store/slices/auctionSlice";
import { createBid } from "../store/slices/bidSlice";
import { joinAuction } from "../store/slices/userSlice";
import { calculateTimeLeft } from "../utils/timeUtils";
import InfoModal from "../components/Modal/InfoModal";
const socket = io("http://localhost:5000");

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
  const [infoMessage, setInfoMessage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    socket.emit("joinAuction", auctionId);
    socket.on("closeAuction", (completedAuction) => {
      console.log("closeAuction event received:", completedAuction);
      if (completedAuction.auctionId === auctionId) {
        console.log("Açık arttırma tamamlandı:", completedAuction);
        navigate("/");
      }
    });

    return () => {
      socket.off("closeAuction");
    };
  }, [auctionId, navigate]);

  useEffect(() => {
    if (auctionId) {
      dispatch(getAuctionById(auctionId));
    }
  }, [dispatch, auctionId]);

  // useEffect(() => {
  //   if (user) {
  //     console.log("user", user, auctionId, user._id);
  //   }
  // }, [user]);
  useEffect(() => {
    if (auction) {
      console.log("auction", auction);
    }
  }, [auction]);

  // useEffect(() => {
  //   if (bid) {
  //     console.log("bid", bid);
  //   }
  // }, [bid]);

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
    if (auction?.currentHighestBid?.user === user._id) return;
    const bidAction = async () => {
      const result = await dispatch(
        createBid({
          auctionId,
          userId: user._id,
          amount: amount + (bid?.amount || auction.startingPrice || 0),
        })
      );
      if (result.error) {
        setModalMessage({
          message: "Teklif başarısız oldu.",
          success: false,
        });
        setModalVisible(true);
      } else {
        setModalMessage({
          message: "Teklif başarıyla verildi.",
          success: true,
        });
        setModalVisible(true);
      }
    };
    setConfirmAction(() => bidAction);
    setShowConfirm(true); // Show confirmation modal
  };

  // const handleJoinAuction = () => {
  //   const reqData = {
  //     userId: user._id,
  //     auctionId: auctionId,
  //   };
  //   dispatch(joinAuction(reqData));
  // };

  // const handleBid = (amount) => {
  //   if (auction?.currentHighestBid?.user === user._id) return;
  //   const bidAction = async () => {
  //     const result = await dispatch(
  //       createBid({
  //         auctionId,
  //         userId: user._id,
  //         amount: amount + (bid?.amount || auction.startingPrice || 0),
  //       })
  //     );
  //     if (result.error) {
  //       setModalMessage({
  //         message: "Teklif başarısız oldu.",
  //         success: false,
  //       });
  //       setModalVisible(true);
  //     } else {
  //       setModalMessage({
  //         message: "Teklif başarıyla verildi.",
  //         success: true,
  //       });
  //       setModalVisible(true);
  //     }
  //   };
  //   setConfirmAction(() => bidAction);
  //   setShowConfirm(true); // Show confirmation modal
  // };

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
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <InfoModal
        isVisible={showInfo}
        onClose={() => setShowInfo(false)}
        message={infoMessage}
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
  return (
    <>
      <div className="flex flex-col h-fit w-full p-2 gap-1 rounded-lg bg-dark-2">
        <h1 className="text-lg text-light-2 font-semibold text-center">
          Teklif Ver
        </h1>
        <HorizontalLine />
        {user.auctions?.includes(auctionId) ? (
          <>
            {/* <div
              className={`${bid?.user === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg`}
              onClick={() => handleBid(1000)}
            >
              <h1 className="text-center font-semibold text-light-2">
                + 1000 TL
              </h1>
            </div>
            <div
              className={`${bid?.user === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg `}
              onClick={() => handleBid(2000)}
            > */}
            <div
              className={`${auction?.currentHighestBid?.user === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg`}
              onClick={() => setBidModal(1000)}
            >
              <h1 className="text-center font-semibold text-light-2">
                + 1000 TL
              </h1>
            </div>
            <div
              className={`${auction?.currentHighestBid?.user === user._id ? "bg-light-7 cursor-not-allowed" : "bg-success cursor-pointer"} p-3 rounded-lg `}
              onClick={() => setBidModal(2000)}
            >
              <h1 className="text-center font-semibold text-light-2">
                + 2000 TL
              </h1>
            </div>
          </>
        ) : (
          // <div
          //   className="bg-success p-3 rounded-lg cursor-pointer"
          //   onClick={() => {
          //     setConfirmAction(() => handleJoinAuction);
          //     setShowConfirm(true);
          //   }}
          // >
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
