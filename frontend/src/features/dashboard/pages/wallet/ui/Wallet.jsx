import { useEffect, useState } from "react";
import { useWallet } from "../hook/useWallet";
import {
  Wallet as WalletIcon,
  Plus,
  ShieldCheck,
  IndianRupee,
  ArrowUpRight,
  RefreshCw,
  CreditCard,
} from "lucide-react";

const Wallet = () => {
  const [amount, setAmount] = useState("");

  const {
    error,
    isWalletLoading,
    walletBalance,
    addMoneyByUser,
    verifyPaymentByUser,
    totalWalletBalanceByUser
  } = useWallet();

  // Quick Amount
  const quickAmounts = [100, 200, 500, 1000, 2000];


useEffect(() => {

  const totalBal =async ()=>{

   await  totalWalletBalanceByUser().catch((error) => {
      console.error("Wallet Balance Error:", error);
    });
  }
  totalBal();
}, [totalWalletBalanceByUser]);



  // ADD MONEY HANDLER
  const handleAddMoney = async (e) => {
    e.preventDefault();

    const amountInRupees = Number(amount);

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

      // STEP 3: Checkout Options
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,

        name: "Riya Cyber Cafe",
        description: "Wallet Recharge",

        order_id: order.orderId,

        handler: async (response) => {
          try {
            // STEP 4: Verify Payment
            const result = await verifyPaymentByUser({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Payment Verified:", result);

            setAmount("");

            alert("Wallet credited successfully!");

          } catch (error) {
            console.error("Verification Error:", error);

            alert(
              error?.message ||
              "Payment verification pending. Please check your wallet."
            );
          }
        },

        theme: {
          color: "#258b91",
        },

        modal: {
          ondismiss: () => {
            console.log("Razorpay Checkout Closed");
          },
        },
      };

      // STEP 5: Open Razorpay
      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", (response) => {
        console.error("Payment Failed:", response.error);

        alert(
          response.error.description ||
          "Payment failed. Please try again."
        );
      });

      razorpayInstance.open();

    } catch (error) {
      console.error("Add Money Error:", error);

      alert(
        error?.message ||
        "Unable to initiate payment. Please try again."
      );
    }
  };

  // PENDING PAYMENT
  const handleCheckStatus = () => {
    console.log("Checking pending payment status...");
  };

  // Currency Format
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0fbfa] via-white to-[#e8f7f6] px-4 py-8 sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#258b91]">
              <WalletIcon size={18} />
              MY WALLET
            </div>

            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Wallet Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your balance and add money securely.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#d5eeee] bg-white px-4 py-2 text-sm font-medium text-[#258b91] shadow-sm">
            <ShieldCheck size={17} />
            Secure Payments
          </div>

        </div>


        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* WALLET BALANCE CARD */}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] p-7 text-white shadow-xl shadow-[#258b91]/20 sm:p-9">

            {/* Decorative Circles */}

            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[30px] border-white/10" />

            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[35px] border-white/10" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <WalletIcon size={20} />
                  Total Wallet Balance
                </div>

                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                  <IndianRupee size={23} />
                </div>

              </div>

              <div className="mt-10">

                <p className="text-sm text-white/80">
                  Available Balance
                </p>

                <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  {formatCurrency((walletBalance || 0) / 100)}
                </h2>

              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-5">

                <div>
                  <p className="text-xs text-white/70">
                    Wallet Account
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Active Account
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  Active
                </div>

              </div>

            </div>

          </div>


          {/* ADD MONEY CARD */}

          <div className="rounded-2xl border border-[#d5eeee] bg-white p-6 shadow-[0_10px_40px_rgba(50,120,120,0.07)] sm:p-8">

            <div className="mb-7 flex items-center gap-3">

              <div className="rounded-xl bg-[#e8f7f6] p-3 text-[#258b91]">
                <Plus size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add Money
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Recharge your wallet instantly
                </p>
              </div>

            </div>


            <form
              onSubmit={handleAddMoney}
              className="space-y-6"
            >

              {/* AMOUNT INPUT */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Enter Amount
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-[#258b91]">
                    ₹
                  </span>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    max="2000"
                    step="1"
                    disabled={isWalletLoading}
                    className="w-full rounded-xl border border-[#55b9b5]/50 bg-[#f8fdfd] py-4 pl-11 pr-4 text-xl font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#258b91] focus:ring-4 focus:ring-[#55b9b5]/15 disabled:opacity-60"
                  />

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Minimum ₹100 · Maximum ₹2,000
                </p>

              </div>


              {/* QUICK AMOUNTS */}

              <div>

                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Quick Select
                </p>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">

                  {quickAmounts.map((value) => (

                    <button
                      key={value}
                      type="button"
                      disabled={isWalletLoading}
                      onClick={() => setAmount(String(value))}
                      className={`rounded-lg border py-2.5 text-sm font-semibold transition
                        ${
                          Number(amount) === value
                            ? "border-[#258b91] bg-[#e8f7f6] text-[#258b91]"
                            : "border-gray-200 bg-white text-gray-600 hover:border-[#55b9b5] hover:bg-[#f0fbfa]"
                        }`}
                    >
                      ₹{value}
                    </button>

                  ))}

                </div>

              </div>


              {/* ERROR */}

              {error && (

                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  {typeof error === "string"
                    ? error
                    : error.message || "Something went wrong"}
                </div>

              )}


              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={isWalletLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#55b9b5] to-[#258b91] py-4 font-bold text-white shadow-lg shadow-[#258b91]/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isWalletLoading ? (
                  <>
                    <RefreshCw size={19} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Add Money to Wallet
                    <ArrowUpRight size={18} />
                  </>
                )}

              </button>

            </form>

          </div>

        </div>


        {/* PAYMENT INFORMATION */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-xl border border-[#d5eeee] bg-white p-5 shadow-sm">

            <div className="rounded-xl bg-[#e8f7f6] p-3 text-[#258b91]">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Secure Payments
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Powered by Razorpay payment gateway.
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4 rounded-xl border border-[#d5eeee] bg-white p-5 shadow-sm">

            <div className="rounded-xl bg-[#e8f7f6] p-3 text-[#258b91]">
              <CreditCard size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Multiple Payment Options
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Pay using supported Razorpay methods.
              </p>
            </div>

          </div>

        </div>


        {/* PENDING PAYMENT */}

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center">

          <div>

            <h3 className="font-semibold text-gray-800">
              Payment Issue?
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              If your payment is pending, check its status.
            </p>

          </div>

          <button
            type="button"
            onClick={handleCheckStatus}
            className="flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            <RefreshCw size={16} />
            Check Payment Status
          </button>

        </div>


        {/* FOOTER */}

        <div className="mt-8 text-center text-xs text-gray-400">
          Your wallet transactions are protected with secure payment verification.
        </div>

      </div>

    </div>
  );
};

export default Wallet;