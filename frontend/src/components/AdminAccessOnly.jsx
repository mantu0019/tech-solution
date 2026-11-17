import { Navigate, Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";

const AdminAccessOnly = () => {
  const { authData } = useAuth();
  console.log(authData?.userData?.role)
  if (!authData) {
    return <Navigate to={"/login"} replace />;
  }

  if (authData?.userData?.role !== "admin") {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
};

export default AdminAccessOnly;
