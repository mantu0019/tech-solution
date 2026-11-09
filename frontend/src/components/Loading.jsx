 
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf7f7] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#55b9b5]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#369fa3]/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-center gap-5">

        {/* Unique Loader */}
        <div className="relative w-14 h-14 flex items-center justify-center">

          <div className="absolute inset-0 rounded-full border-[3px] border-[#55b9b5]/20" />

          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#319fa1] border-r-[#55b9b5] animate-spin" />

          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#55b9b5] to-[#369fa3] shadow-[0_0_12px_rgba(49,159,161,0.4)]" />

        </div>

        {/* Loading Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-[#319fa1]">
            Riya Cyber Cafe
          </p>

          <p className="text-xs text-gray-500 animate-pulse">
            Loading...
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;
 