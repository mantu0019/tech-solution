import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminServiceAction,
  updateServicesAction,
} from "../state/adminServiceAction";

export const useAdmin = () => {
  const {
    isLoading,
    error,
    adminServices,
    isUpdating,
  } = useSelector((state) => state.adminServicesSlice);

  const dispatch = useDispatch();

  // Get all services
  const adminServicesAllData = useCallback(
    (params = {}) => {
      return dispatch(adminServiceAction(params)).unwrap();
    },
    [dispatch]
  );

  // Update service
  const updateServicesByAdmin = useCallback(
    (data) => {
      return dispatch(updateServicesAction(data)).unwrap();
    },
    [dispatch]
  );

  return {
    error,
    isLoading,
    isUpdating,
    adminServices,
    adminServicesAllData,
    updateServicesByAdmin,
  };
};