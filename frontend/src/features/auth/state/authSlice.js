import { createSlice } from "@reduxjs/toolkit";
import { forgetPasswordUser, getMeUser, loginUser, logOutUser, registerUser, resendOtpUser, resetPasswordUser, verifyEmailUser, verifyResetPasswordUser } from "./authAction";
  
const authSlice = createSlice({
    name:"auth",
    initialState:{
        authData:null,
        isLoading:true,
        error:null,
        isRegistering: false,
        isVerifyingEmail: false,
        isLoggingIn: false,
        isResendOtp:false
 

    },
    extraReducers:(builder)=>{
           return builder.
            //registerUser
           addCase(registerUser.pending,(state,action)=>{

           state.isRegistering = true;
           state.error = null;

           }).addCase(registerUser.fulfilled,(state,action)=>{

             state.isRegistering = false;
              state.error  = null;
           }).addCase(registerUser.rejected,(state,action)=>{
               state.isRegistering = false;
               state.error = action?.payload || "Error in Register";

           })
            // verifyEmailUser
           
           .addCase(verifyEmailUser.pending,(state,action)=>{
           state.isVerifyingEmail = true;
           state.error = null;
 

           }).addCase(verifyEmailUser.fulfilled,(state,action)=>{
          state.isVerifyingEmail = false;
          state.authData = action?.payload;
           state.error = null; 
             
            }).addCase(verifyEmailUser.rejected,(state,action)=>{
            state.isVerifyingEmail = false;
            state.error = action?.payload || "something went wrong"
           })
           //login
           .addCase(loginUser.pending,(state)=>{
               state.isLoggingIn = true;
               state.error = null;
           })
          .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoggingIn = false;
            state.authData = action?.payload ;
            state.error = null 
 
            }).addCase(loginUser.rejected,(state,action)=>{
              state.isLoggingIn = false;
              state.error = action?.payload || "Invalid email or password";
     
          })

          //getMe
          .addCase(getMeUser.pending,(state,action)=>{
            state.isLoading = true;
            state.error = null;
 
          }).addCase(getMeUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.authData = action?.payload;
          }).addCase(getMeUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.authData = null;
          })

          // logOut
          .addCase(logOutUser.fulfilled,(state,action)=>{
              state.authData = null;
              state.isLoading  = false;
              state.error = null;
          })
          //resend otp
          .addCase(resendOtpUser.pending,(state,action)=>{
             state.isResendOtp = true;
             state.error = null;
 

          }).addCase(resendOtpUser.fulfilled,(state,action)=>{
            state.isResendOtp = false;
             state.error = null

          }).addCase(resendOtpUser.rejected,(state,action)=>{
            state.isResendOtp = false;
            state.error = action?.payload || "Error in resend OTP"
          })
          // forget password

          .addCase(forgetPasswordUser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
          }).addCase(forgetPasswordUser.fulfilled,(state)=>{
            state.isLoading = false;
            state.error = null;
          }).addCase(forgetPasswordUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action?.payload;
          })

          // verifyResetPassword

          .addCase(verifyResetPasswordUser.pending,(state)=>{
            state.isLoading   = true;
            state.error = null;
 
          })
          .addCase(verifyResetPasswordUser.fulfilled,(state)=>{
            state.isLoading = false;
            state.error = null;

          }).addCase(verifyResetPasswordUser.rejected,(state,action)=>{
            state.isLoading = false,
            state.error = action?.payload || "Error"
          })
         // resetPassword 
         .addCase(resetPasswordUser.pending,(state)=>{
         state.isLoading = true;
         state.error = null; 
   
         })
         .addCase(resetPasswordUser.fulfilled,(state)=>{
          state.isLoading= false;
          state.error = null;
         }).addCase(resetPasswordUser.rejected,(state,action)=>{
           state.isLoading = false;
           state.error = action?.payload || "Error"
         })
 

    }
});


export default authSlice.reducer;