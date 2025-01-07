import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
function ProductImages({ product, showPreviews }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false);

  useEffect(() => {
    if (product && product?.images?.length > 0) {
      handleImage(0);
    }
  }, [product]);

  const handleImage = (index) => {
    setSelectedImage(
      product?.images[index < 0 ? product?.images.length - 1 : index]
    );
    setSelectedImageIndex(index < 0 ? product?.images.length - 1 : index);
  };
  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsMouseOverImage(true)}
        onMouseLeave={() => setIsMouseOverImage(false)}
      >
        <div
          className="absolute flex top-0 left-0 justify-start items-center h-full w-1/4 cursor-pointer outline-none select-none"
          onClick={() =>
            handleImage((selectedImageIndex - 1) % product?.images.length)
          }
        >
          {isMouseOverImage && product?.images.length > 0 && (
            <ArrowBackIosNewIcon className="text-dark-8" fontSize="large" />
          )}
        </div>
        <img
          src={selectedImage}
          alt={`Product Selected Image`}
          className="h-fit max-h-60 w-full rounded-lg"
        />
        <div
          className="absolute flex top-0 right-0 justify-end items-center h-full w-1/4 cursor-pointer outline-none select-none"
          onClick={() =>
            handleImage((selectedImageIndex + 1) % product?.images.length)
          }
        >
          {isMouseOverImage && product?.images.length > 0 && (
            <ArrowForwardIosIcon className=" text-dark-8" fontSize="large" />
          )}
        </div>
      </div>
      {showPreviews && (
        <div className="flex w-full h-fit gap-1 py-1 overflow-auto">
          {product?.images && product?.images.length > 0 ? (
            product?.images.map((image, index) => (
              <img
                className="max-h-20 cursor-pointer rounded-md"
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                onClick={() => handleImage(index)}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      )}
    </>
  );
}

export default ProductImages;
