import { apiInstance } from "../../../app/api";

export const register = async ({ fullName, email, password }) => {
  const res = await apiInstance.post("/api/auth/register", {
    fullName,
    email,
    password,
  });
  return res.data;
};

export const verifyEmail = async ({ email, otp }) => {
  const res = await apiInstance.post("/api/auth/verify-email", {
    email,
    otp,
  });

  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await apiInstance.post("/api/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await apiInstance.get("/api/auth/get-me");
  return res.data;
};

export  const logOut = async ()=>{
  const res  = await apiInstance.get("/api/auth/log-out");
  return res.data;
}