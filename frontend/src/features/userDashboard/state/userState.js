import { createSlice } from "@reduxjs/toolkit";
import { downloadResultAction, userDashboardAction } from "./userAction";

const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState: {
    userDashboardData: null,
    isLoading: false,
    error: null,
    downloadLoading: false,
    downloadError: null,
    downloadSuccess: false,
  },
  extraReducers: (builder) => {
    return (
      builder
        .addCase(userDashboardAction.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(userDashboardAction.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.userDashboardData = action?.payload;
        })
        .addCase(userDashboardAction.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action?.payload || "something went wrong";
        })
        // download result

        .addCase(downloadResultAction.pending, (state) => {
          state.downloadLoading = false;
          state.downloadError = true;
        })
        .addCase(downloadResultAction.fulfilled, (state) => {
          state.downloadLoading = false;
          state.downloadSuccess = true;
        })
        .addCase(downloadResultAction.rejected, (state, action) => {
          state.downloadLoading = false;
          state.downloadError =
            action.payload?.message ||
            action.error?.message ||
            "Download failed";
          F;
          state.downloadSuccess = false;
        })
    );
  },
});

export default userDashboardSlice.reducer;
