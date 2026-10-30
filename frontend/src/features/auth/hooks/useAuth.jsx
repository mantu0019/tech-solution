import  { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordUser, getMeUser, loginUser, logOutUser, registerUser, resendOtpUser, verifyEmailUser, verifyResetPasswordUser } from "../state/authAction";

export const useAuth = () => {
  const { authData, isLoading, isLoggingIn, error,isRegistering,isVerifyingEmail,isResendOtp} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const registerByUser = useCallback(
    (data) => {
      return dispatch(registerUser(data)).unwrap();
    },
    [dispatch],
  );

  const verifyEmailByUser = useCallback((data)=>{
    return dispatch(verifyEmailUser(data)).unwrap();
  },[dispatch])

  const loginByUser = useCallback((data)=>{
    return dispatch(loginUser(data)).unwrap()
  },[dispatch])

  const getMeByUser = useCallback(()=>{
    return dispatch(getMeUser()).unwrap()
  },[dispatch]);

  const logOutByUser = useCallback(()=>{
    return dispatch(logOutUser()).unwrap()
  },[dispatch])

  const resendOtpByUser = useCallback((data)=>{
   return dispatch(resendOtpUser(data)).unwrap()
 
  },[dispatch]);

  const forgetPasswordByUser = useCallback((data)=>{
    return dispatch(forgetPasswordUser(data)).unwrap()
  });

  const verifyResetPasswordByUser = useCallback((data)=>{
    return dispatch(verifyResetPasswordUser(data)).unwrap();
 
  });


  return {authData,isLoading,isRegistering, isVerifyingEmail,isLoggingIn,isResendOtp , error,registerByUser,verifyEmailByUser,loginByUser,getMeByUser,logOutByUser,resendOtpByUser,forgetPasswordByUser,verifyResetPasswordByUser}
};

export default useAuth;
