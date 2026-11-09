import apiInstance from "../../../../../app/api";

export const addMoney = async ({ amount }) => {
  const res = await apiInstance.post("/api/wallet/add-money", { amount });

  return res.data;
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const res = await apiInstance.post("/api/wallet/verify-payment",{
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  return res.data;
};



export const totalWalletBalance = async()=>{

    const res  = await apiInstance.get("/api/wallet/total-wallet-balance");
    return res.data;
}