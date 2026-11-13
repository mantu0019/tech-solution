 
import { createAsyncThunk } from "@reduxjs/toolkit";

const createAppAsyncThunk = (typePrefix, service) => {
  return createAsyncThunk(typePrefix, async (authData, thunkAPI) => {
    try {
      return await service(authData);

    } catch (error) {

      console.log("API ERROR:", error);
      console.log("BACKEND RESPONSE:", error?.response?.data);

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    }
  });
};

export default createAppAsyncThunk;