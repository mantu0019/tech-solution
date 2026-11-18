 

import { createSlice } from "@reduxjs/toolkit";
import {
  adminServiceAction,
  updateServicesAction,
} from "./adminServiceAction";

const adminServicesSlice = createSlice({
  name: "adminServices",

  initialState: {
    adminServices: null,
    isLoading: false,
    isUpdating: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      // Get all services
      .addCase(adminServiceAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminServiceAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminServices = action.payload;
      })
      .addCase(adminServiceAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Update service
      .addCase(updateServicesAction.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateServicesAction.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedApplication = action.payload?.data?.application;

        if (!updatedApplication) return;

        if (Array.isArray(state.adminServices?.data?.applications)) {
          state.adminServices.data.applications =
            state.adminServices.data.applications.map((application) =>
              application._id === updatedApplication._id
                ? { ...application, ...updatedApplication }
                : application
            );
        }
      })
      .addCase(updateServicesAction.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default adminServicesSlice.reducer;