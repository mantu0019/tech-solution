import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadResultAction, userDashboardAction } from "../state/userAction";

export const useUserDashboard = () => {
  const {
    isLoading,
    error,
    userDashboardData,
    downloadSuccess,
    downloadError,
    downloadLoading,
  } = useSelector((state) => state.userDashboard);

  const dispatch = useDispatch();

  const userDashboardDataByUser = useCallback(() => {
    return dispatch(userDashboardAction()).unwrap();
  }, [dispatch]);

  const downloadResultByUser = useCallback((requestId)=>{
    return dispatch(downloadResultAction(requestId)).unwrap();
  },[dispatch])

  return {
    isLoading,
    error,
    downloadSuccess,
    downloadError,
    downloadLoading,
    userDashboardData,
    userDashboardDataByUser,
    downloadResultByUser
  };
};
