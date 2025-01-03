import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import HighestBidCard from "../components/HighestBidCard";
import PreviousBidsCard from "../components/PreviousBidsCard";
import HorizontalLine from "../components/HorizontalLine";
import ProductDetails from "../components/ProductDetails";
import ProductImages from "../components/ProductImages";
import { getAuctionById } from "../store/slices/auctionSlice";
import { createBid } from "../store/slices/bidSlice";
import { calculateTimeLeft } from "../utils/timeUtils";
import CustomModal from "../components/CustomModal";
const socket = io("http://localhost:5000");

function AuctionPage() {
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { auction, isLoading, error } = useSelector((state) => state.auction);
  const { bid } = useSelector((state) => state.bid);
  const [timeLeft, setTimeLeft] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlük state'i
  const [modalMessage, setModalMessage] = useState(""); // Modal mesajı
  const [asdVisible, setAsdVisible] = useState(false); // Modal görünürlük state'i
  const [asdMessage, setAsdMessage] = useState(""); // Modal mesajı

  const navigate = useNavigate();
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

  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime);
      setTimeLeft(newTimeLeft);
    }
  }, [auction]);

  useEffect(() => {
    if (auction && auction.auctionEndTime) {
      const interval = setInterval(() => {
        calcTimeLeftMemo();
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [auction, calcTimeLeftMemo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !auction) {
    return <div>Error loading auction details</div>;
  }

  const handleBid = () => {
    testFirstUser();
    testSecondUser();
  };
  const testFirstUser = async () => {
    const firstUser = {
      exp: 1735655655,
      iat: 1735569255,
      role: "admin",
      userId: "67703e6a088cc2f06a9fb17c",
    };
    const result = await dispatch(
      createBid({
        auctionId,
        user: firstUser,
        amount: 1 + bid.amount,
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
  const testSecondUser = async () => {
    const secondUser = {
      exp: 1735655655,
      iat: 1735569255,
      role: "user",
      userId: "67703f11088cc2f06a9fb17f",
    };
    const result = await dispatch(
      createBid({
        auctionId,
        user: secondUser,
        amount: 2 + bid.amount,
      })
    );
    if (result.error) {
      setAsdMessage({
        message: "Teklif başarısız oldu.",
        success: false,
      });
      setAsdVisible(true);
    } else {
      setAsdMessage({
        message: "Teklif başarıyla verildi.",
        success: true,
      });
      setAsdVisible(true);
    }
  };

  return (
    <div className="flex flex-col self-center size-full max-w-6xl gap-1 overflow-auto">
      <HighestBidCard />
      <div className="flex flex-row size-full gap-1 overflow-auto">
        <div className="flex flex-col size-full bg-dark-2 rounded-lg overflow-auto">
          <ProductImages />

          {/* <HorizontalLine /> */}
          {/* <ProductDetails /> */}
        </div>
        <div className="size-full max-w-80 bg-dark-2"></div>
        <div className="flex flex-col size-full max-w-80 bg-dark-2 rounded-lg  overflow-auto">
          <div className="flex flex-col gap-1">
            <h1 className="text-center">Teklif Ver</h1>
            <HorizontalLine />
            <div
              className="bg-success p-4 rounded-lg cursor-pointer"
              onClick={() => handleBid(1000)}
            >
              <h1 className="text-center">1000 Arttır</h1>
            </div>
            <div
              className="bg-success p-4 rounded-lg cursor-pointer"
              onClick={() => handleBid(2000)}
            >
              <h1 className="text-center">2000 Arttır</h1>
            </div>
          </div>

          <HorizontalLine />
          <div className="flex flex-col gap-1">
            <h1 className="text-center">İhalenin Tamamlanmasına Kalan Süre</h1>
            <HorizontalLine />
            <h1 className="text-center"> {timeLeft}</h1>
          </div>
          <HorizontalLine />
          <PreviousBidsCard />
        </div>
      </div>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <CustomModal
        isVisible={asdVisible}
        onClose={() => setAsdVisible(false)}
        message={asdMessage}
      />
    </div>
  );
}

export default AuctionPage;
