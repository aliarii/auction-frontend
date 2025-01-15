import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
      product?.images[index < 0 ? product?.images.length - 1 : index],
    );
    setSelectedImageIndex(index < 0 ? product?.images.length - 1 : index);
  };
  return (
    <>
      <div
        className="relative h-full shadow-lg"
        onMouseEnter={() => setIsMouseOverImage(true)}
        onMouseLeave={() => setIsMouseOverImage(false)}
      >
        <div
          className="absolute left-0 top-0 flex h-full w-1/4 cursor-pointer select-none items-center justify-start outline-none"
          onClick={() =>
            handleImage((selectedImageIndex - 1) % product?.images.length)
          }
        >
          {isMouseOverImage && product?.images.length > 0 && (
            <FaAngleLeft style={{ fontSize: 35 }} />
          )}
        </div>
        <img
          src={selectedImage}
          alt={`Product Selected Image`}
          // className="h-fit max-h-60 w-full rounded-lg"
          className="h-full w-full rounded-lg"
        />
        <div
          className="absolute right-0 top-0 flex h-full w-1/4 cursor-pointer select-none items-center justify-end outline-none"
          onClick={() =>
            handleImage((selectedImageIndex + 1) % product?.images.length)
          }
        >
          {isMouseOverImage && product?.images.length > 0 && (
            <FaAngleRight style={{ fontSize: 35 }} />
          )}
        </div>
      </div>
      {showPreviews && (
        <div className="flex h-fit w-full gap-1 overflow-auto py-1">
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
