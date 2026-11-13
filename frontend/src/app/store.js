import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/state/authSlice';
import wallet from "../features/dashboard/pages/wallet/state/walletSlice";
import services from "../features/dashboard/state/serviceState";
import adminServicesSlice from '../features/admin/state/adminServiceState';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    wallet:wallet,
    services:services,
    adminServicesSlice:adminServicesSlice
  },
});
