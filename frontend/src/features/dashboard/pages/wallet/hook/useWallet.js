import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addMoneyUser, verifyPaymentUser } from "../state/walletAction";

export const useWallet = ()=>{

   const {error,isWalletLoading,walletBalance} = useSelector((state)=>state.wallet);
   const dispatch = useDispatch();
 
  const addMoneyByUser = useCallback((data)=>{
    return dispatch(addMoneyUser(data)).unwrap()
 },[dispatch]); 

 
 const verifyPaymentByUser = useCallback((data)=>{
  return dispatch(verifyPaymentUser(data)).unwrap()
 },[dispatch]);

 

   return {
     error,isWalletLoading,walletBalance,addMoneyByUser,verifyPaymentByUser
   }
}