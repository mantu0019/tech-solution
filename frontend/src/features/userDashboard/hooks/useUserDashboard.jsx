import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDashboardAction } from "../state/userAction";

export const useUserDashboard = () => {
  const { isLoading, error, userDashboardData } = useSelector(
    (state) => state.userDashboard,
  );

  const dispatch = useDispatch();

  const userDashboardDataByUser = useCallback(() => {
    return dispatch(userDashboardAction()).unwrap();
  }, [dispatch]);

  return {
    isLoading,
    error,
    userDashboardData,
    userDashboardDataByUser,
  };
};
