import { createSlice } from "@reduxjs/toolkit";
import { adminServiceAction } from "./adminServiceAction";
 
 
const adminServicesSlice = createSlice({
  name:"adminServices",
  initialState:{
 
   adminServices:null,
   isLoading:false,
   error :null
   },
   extraReducers:(builder)=>{
     builder.addCase(adminServiceAction.pending,(state)=>{
      state.isLoading = true;
      state.error = null;
 
     }).addCase(adminServiceAction.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.adminServices = action?.payload;


     }).addCase(adminServiceAction.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action?.payload || "something went wrong"
     })
   }

})

export default adminServicesSlice.reducer;