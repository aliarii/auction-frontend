import React from "react";

function ProductImages() {
  return (
    <div className="flex flex-col justify-center items-center size-full p-2 overflow-auto">
      <div className="min-h-72 w-full gap-1 bg-black"></div>
      <div className="flex w-full h-full gap-1 py-1 overflow-auto">
        {Array.from(Array(10)).map((_, idx) => (
          <div key={idx} className=" min-w-28 bg-black"></div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
