 
import { Navigate, Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import Loading from "./Loading";

const PrivateRoutes = () => {
  const { authData, isLoading } = useAuth();
   console.log({
    isLoading,
    authData,
    role: authData?.userData?.role,
  });

  if (isLoading) return <Loading />;

  return authData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
 