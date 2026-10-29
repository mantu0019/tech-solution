import { setAccessToken } from "../../../app/api";
import { getMe, login, logOut, register, verifyEmail } from "../services/api";
import createAppAsyncThunk from "./createAsyncThunk";

export const registerUser = createAppAsyncThunk("auth/register", register);

export const verifyEmailUser = createAppAsyncThunk(
  "auth/verify-email-user",
  async (data) => {
    const response = await verifyEmail(data);

    if (response?.accessToken) {
      setAccessToken(response.accessToken);
    }

    return response;
  },
);

export const loginUser = createAppAsyncThunk(
  "auth/login",

  async (data) => {
    const response = await login(data);

    setAccessToken(response?.accessToken);
    return response;
  },
);
export const getMeUser = createAppAsyncThunk("auth/get-me", getMe);

export const logOutUser = createAppAsyncThunk("auth/log-out",logOut);