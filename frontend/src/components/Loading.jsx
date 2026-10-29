import React from "react";

const Loading = () => {
return ( <div className="min-h-screen flex items-center justify-center bg-[#f1f1ef]"> <div className="flex flex-col items-center gap-3"> <div className="w-8 h-8 border-4 border-[#e2e2de] border-t-[#1c1c1c] rounded-full animate-spin" />

 
    <p className="text-sm text-[#77776f]">Loading...</p>
  </div>
</div>
  

);
};

export default Loading;
