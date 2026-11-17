import { createSlice } from "@reduxjs/toolkit";
import { userDashboardAction } from "./userAction";
 
const userDashboardSlice = createSlice({
    name:"userDashboard",
    initialState:{
        userDashboardData:null,
        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
        return builder.addCase(userDashboardAction.pending,(state)=>{
            state.isLoading = true;
            state.error  = null;
        }).addCase(userDashboardAction.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error  = null;
            state.userDashboardData = action?.payload;

        }).addCase(userDashboardAction.rejected,(state,action)=>{
            state.isLoading = false;
            state.error  = action?.payload || "something went wrong"
 
        })
    }
});

export default userDashboardSlice.reducer;