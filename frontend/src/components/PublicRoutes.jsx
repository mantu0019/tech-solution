// import { Navigate, Outlet } from "react-router";
// import useAuth from "../features/auth/hooks/useAuth";
// import Loading from "./Loading";

// const PublicRoutes = () => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) return <Loading />;

//   return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
// };

// export default PublicRoutes;



import { Navigate, Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import Loading from "./Loading";

const PublicRoutes = () => {
  const { authData, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return authData ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;