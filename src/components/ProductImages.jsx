import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
function ProductImages() {
  const { auction } = useSelector((state) => state.auction);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (auction.product.images.length > 0) {
      handleImage(0);
    }
  }, [auction]);

  const handleImage = (index) => {
    setSelectedImage(
      auction.product.images[
        index < 0 ? auction.product.images.length - 1 : index
      ]
    );
    setSelectedImageIndex(
      index < 0 ? auction.product.images.length - 1 : index
    );
  };
  return (
    <div className="flex flex-col  items-center size-full p-2 overflow-auto">
      <div className="relative w-full h-fit gap-1">
        <div
          className="absolute flex top-0 left-0 justify-start items-center h-full w-28 cursor-pointer outline-none select-none"
          onClick={() =>
            handleImage(
              (selectedImageIndex - 1) % auction.product.images.length
            )
          }
        >
          <ArrowBackIosNewIcon className=" text-dark-8" fontSize="large" />
        </div>
        <img src={selectedImage} alt={`Product Selected Image`} />
        <div
          className="absolute flex top-0 right-0 justify-end items-center h-full w-28 cursor-pointer outline-none select-none"
          onClick={() =>
            handleImage(
              (selectedImageIndex + 1) % auction.product.images.length
            )
          }
        >
          <ArrowForwardIosIcon className=" text-dark-8" fontSize="large" />
        </div>
      </div>

      <div className="flex w-full h-32 gap-1 py-1 overflow-auto">
        {auction.product.images && auction.product.images.length > 0 ? (
          auction.product.images.map((image, index) => (
            <img
              className="cursor-pointer"
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              // stil ekleyebilirsiniz
              onClick={() => handleImage(index)}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      {/* <div>
        {auction.product.images && auction.product.images.length > 0 ? (
          auction.product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                marginRight: "10px",
              }} // stil ekleyebilirsiniz
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div> */}
    </div>
  );
}

export default ProductImages;
