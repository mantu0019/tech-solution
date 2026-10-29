import { createSlice } from "@reduxjs/toolkit";
import { getMeUser, loginUser, logOutUser, registerUser, verifyEmailUser } from "./authAction";
  
const authSlice = createSlice({
    name:"auth",
    initialState:{
        authData:null,
        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
           return builder.
            //registerUser
           addCase(registerUser.pending,(state,action)=>{

           state.isLoading = true;
           state.error = null;

           }).addCase(registerUser.fulfilled,(state,action)=>{

             state.isLoading = false;
             state.authData = action?.payload;
             state.error  = null;
           }).addCase(registerUser.rejected,(state,action)=>{
               state.isLoading = false;
               state.error = action?.payload || "Error in Register";

           })
            // verifyEmailUser
           
           .addCase(verifyEmailUser.pending,(state,action)=>{
           state.isLoading = true;
           state.error = null;
 

           }).addCase(verifyEmailUser.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.authData = action?.payload;
           state.error = null; 
             
            }).addCase(verifyEmailUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action?.payload || "something went wrong"
           })
           //login
           .addCase(loginUser.pending,(state)=>{
               state.isLoading = true;
               state.error = null;
           })
          .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.authData = action?.payload ;
            state.error = null 
 
            }).addCase(loginUser.rejected,(state,action)=>{
              state.isLoading = false;
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
 

    }
});


export default authSlice.reducer;