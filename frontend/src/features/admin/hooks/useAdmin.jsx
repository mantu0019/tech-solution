import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminServiceAction } from "../state/adminServiceAction";

export const useAdmin = () => {
  const { isLoading, error, adminServices } = useSelector(
    (state) => state.adminServicesSlice,
  );

  const dispatch = useDispatch();

  const adminServicesAllData = useCallback(() => {
    return dispatch(adminServiceAction()).unwrap();
  }, [dispatch]);

  return { error, isLoading, adminServicesAllData, adminServices };
};
