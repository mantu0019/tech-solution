// import { Navigate, Outlet } from "react-router";
// import useAuth from "../features/auth/hooks/useAuth";
// import Loading from "./Loading";

// const PrivateRoutes = () => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) return <Loading />;

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoutes;





import { Navigate, Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import Loading from "./Loading";

const PrivateRoutes = () => {
  const { authData, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return authData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;