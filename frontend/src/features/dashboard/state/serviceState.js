import { createSlice } from "@reduxjs/toolkit";
import { llRequestUser } from "./servicesAction";

const servicesSlice = createSlice({
    name:"services",
    initialState:{
        isLoading:false,
        error :null
    },
    extraReducers:(builder)=>{

    return builder.addCase(llRequestUser.pending,(state)=>{
            
        state.isLoading = true;
        state.error = null;


    }).addCase(llRequestUser.fulfilled,(state)=>{
        state.isLoading = false;
        state.error = null;
    })
     
    .addCase(llRequestUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action?.payload || "something went wrong state mm......"
    })

 
    }
});


export default servicesSlice.reducer;