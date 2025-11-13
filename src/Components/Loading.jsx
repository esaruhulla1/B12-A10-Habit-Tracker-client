import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-t-[#096B68] border-b-[#f47000] border-l-[#129990] border-r-gray-300 rounded-full animate-spin mb-4 shadow-lg"></div>
      
    </div>
  );
};

export default Loading;
