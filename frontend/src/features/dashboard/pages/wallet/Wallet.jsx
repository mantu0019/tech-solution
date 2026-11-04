import React, { useState } from "react";

const Wallet = () => {
  const [amount, setAmount] = useState("");

  const handleAddMoney = () => {
    if (!amount || Number(amount) < 100 || Number(amount) > 2000) {
      alert("Please enter an amount between ₹100 and ₹2000");
      return;
    }

    console.log("Adding amount:", amount);
  };

  const handleCheckStatus = () => {
    console.log("Checking pending payment status...");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0fbfa] via-white to-[#e8f7f6] p-4 sm:p-8">

      <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-[#d5eeee] bg-white shadow-[0_10px_40px_rgba(50,120,120,0.08)]">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#55b9b5] to-[#258b91] px-5 py-4">
          <h2 className="text-lg font-bold text-white">
            Wallet - Instant Top Up
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6 sm:p-8">

          <div>
            <label className="mb-3 block text-base font-medium text-gray-800">
              Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-gray-500">
                ₹
              </span>

              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                max="2000"
                className="w-full rounded-lg border border-[#55b9b5] bg-white py-3 pl-10 pr-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#55b9b5]/30"
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Minimum ₹100 · Maximum ₹2,000
            </p>
          </div>

          {/* Add Money */}
          <button
            onClick={handleAddMoney}
            className="w-full rounded-lg bg-gradient-to-r from-[#55b9b5] to-[#258b91] py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
          >
            Add Money
          </button>

          {/* Pending Payment */}
          <button
            onClick={handleCheckStatus}
            className="w-full rounded-lg border border-amber-400 bg-amber-300 py-3 text-base font-medium text-gray-800 transition hover:bg-amber-400 active:scale-[0.99]"
          >
            Pending Payment Check Status
          </button>

        </div>
      </div>
    </div>
  );
};

export default Wallet;