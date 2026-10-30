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

export const logOut = async () => {
  const res = await apiInstance.get("/api/auth/log-out");
  return res.data;
};

export const resendOtp = async ({ email }) => {
  const res = await apiInstance.post("/api/auth/resend-otp", {
    email,
  });

  return res.data;
};

export const forgetPassword  = async ({email})=>{
  const res  = await apiInstance.post("/api/auth/forget-password",{
    email
  })
};


export const verifyResetPassword = async({email,otp})=>{

   const res = await apiInstance.post("/api/auth/verify-reset-otp",{
      email,password
   });
   return res.data;
 
};

export const resetPassword = async({resetToken,newPassword,confirmPassword} )=>{

   const res = await apiInstance.post("/api/auth/reset-password",{resetToken,newPassword,confirmPassword} );
    return  res.data;


}


 