import { createSlice } from "@reduxjs/toolkit";
import { addMoneyUser, verifyPaymentUser } from "./walletAction";
 
const walletSlice = createSlice({
    name:"wallet",
    initialState:{
        walletBalance:0,
        isWalletLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
          return builder.addCase(addMoneyUser.pending,(state)=>{
            state.isWalletLoading = true;
            state.error = null;
          }).addCase(addMoneyUser.fulfilled,(state,action)=>{
            state.isWalletLoading = false;
            state.error = null;
            state.walletBalance = action.payload;
          }).addCase(addMoneyUser.rejected,(state,action)=>{
            state.isWalletLoading = false;
            state.error = action?.payload || "something went wrong";
          })

          // verifyPayment

          .addCase(verifyPaymentUser.pending,(state)=>{
              state.isWalletLoading = true;
              state.error = null;

          }).addCase(verifyPaymentUser.fulfilled,(state,action)=>{
             state.isWalletLoading = false;
             state.error = null;
             state.walletBalance = action?.payload?.data?.walletBalance;
          }).addCase(verifyPaymentUser.rejected,(state,action)=>{
            state.isWalletLoading = false;
            state.error = action?.payload || "something went wrong";
            
          })
    }
})


export default walletSlice.reducer;