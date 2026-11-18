import { createAsyncThunk } from "@reduxjs/toolkit";
import createAppAsyncThunk from "../../auth/state/createAsyncThunk";
import { downloadResult, userDashboard } from "../services/api";

export const userDashboardAction = createAppAsyncThunk(
  "/api/user/userDashboard",
  userDashboard
);

export const downloadResultAction = createAsyncThunk(
  "/api/download-result",
  async (requestId, thunkAPI) => {
    try {
      const res = await downloadResult(requestId);

      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "result";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Download failed"
      );
    }
  }
);