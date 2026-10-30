import { setAccessToken } from "../../../app/api";
import { forgetPassword, getMe, login, logOut, register, resendOtp, resetPassword, verifyEmail, verifyResetPassword } from "../services/api";
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
export const resendOtpUser = createAppAsyncThunk("auth/resend-otp",resendOtp)
export const forgetPasswordUser = createAppAsyncThunk("auth/forget-password",forgetPassword)
export const verifyResetPasswordUser = createAppAsyncThunk("/auth/verify-reset-otp",verifyResetPassword); 
export const resetPasswordUser = createAppAsyncThunk("/auth/reset-password",resetPassword);

