import { useState } from "react";
import { useWallet } from "../hook/useWallet";

const Wallet = () => {
  const [amount, setAmount] = useState("");

  const {
    error,
    isWalletLoading,
    addMoneyByUser,
    verifyPaymentByUser,
  } = useWallet();

  // ADD MONEY HANDLER
  const handleAddMoney = async (e) => {
    e.preventDefault();

    const amountInRupees = Number(amount);

    // Amount Validation
    if (
      !amount ||
      !Number.isFinite(amountInRupees) ||
      !Number.isInteger(amountInRupees) ||
      amountInRupees < 100 ||
      amountInRupees > 2000
    ) {
      alert("Please enter a valid amount between ₹100 and ₹2000");
      return;
    }

    try {
      // STEP 1: Create Razorpay Order
      const orderResponse = await addMoneyByUser({
        amount: amountInRupees,
      });

      const order = orderResponse.data;

      // STEP 2: Check Razorpay SDK
      if (typeof window.Razorpay !== "function") {
        throw new Error("Razorpay SDK not loaded");
      }

      // STEP 3: Razorpay Checkout Options
      const options = {
        key: order.key,

        amount: order.amount,
        currency: order.currency,

        name: "Riya Cyber Cafe",
        description: "Wallet Recharge",

        order_id: order.orderId,

        // STEP 4: Payment Success Handler
        handler: async (response) => {
          try {
            console.log("Razorpay Response:", response);

            // STEP 5: Verify Payment API
            const result = await verifyPaymentByUser({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Verified Payment:", result);

            alert("Wallet credited successfully!");

            setAmount("");

          } catch (error) {
            console.error("Verification Error:", error);

            alert(
              error?.message ||
              "Payment verification pending. Please check your wallet."
            );
          }
        },

        // STEP 6: Checkout Theme
        theme: {
          color: "#258b91",
        },

        // STEP 7: Modal Dismiss
        modal: {
          ondismiss: () => {
            console.log("Razorpay Checkout Closed");
          },
        },
      };

      // STEP 8: Create Razorpay Instance
      const razorpayInstance = new window.Razorpay(options);

      // STEP 9: Payment Failed Event
      razorpayInstance.on("payment.failed", (response) => {
        console.error("Payment Failed:", response.error);

        alert(
          response.error.description ||
          "Payment failed. Please try again."
        );
      });

      // STEP 10: Open Razorpay Checkout
      razorpayInstance.open();

    } catch (error) {
      console.error("Add Money Error:", error);

      alert(
        error?.message ||
        "Unable to initiate payment. Please try again."
      );
    }
  };

  // PENDING PAYMENT STATUS
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

        <form
          onSubmit={handleAddMoney}
          className="space-y-5 p-6 sm:p-8"
        >

          {/* Amount Input */}

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
                step="1"
                disabled={isWalletLoading}
                className="w-full rounded-lg border border-[#55b9b5] bg-white py-3 pl-10 pr-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#55b9b5]/30 disabled:opacity-60"
              />

            </div>

            <p className="mt-2 text-xs text-gray-500">
              Minimum ₹100 · Maximum ₹2,000
            </p>

          </div>

          {/* API Error */}

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {typeof error === "string"
                ? error
                : error.message || "Something went wrong"}
            </p>
          )}

          {/* Add Money Button */}

          <button
            type="submit"
            disabled={isWalletLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#55b9b5] to-[#258b91] py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isWalletLoading ? "Processing..." : "Add Money"}
          </button>

          {/* Pending Payment */}

          <button
            type="button"
            onClick={handleCheckStatus}
            className="w-full rounded-lg border border-amber-400 bg-amber-300 py-3 text-base font-medium text-gray-800 transition hover:bg-amber-400 active:scale-[0.99]"
          >
            Pending Payment Check Status
          </button>

        </form>

      </div>

    </div>
  );
};

export default Wallet;