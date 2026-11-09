 
import { createBrowserRouter } from "react-router";

import PublicRoutes from "../components/PublicRoutes";
import PrivateRoutes from "../components/PrivateRoutes";

 
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import VerifyResetOtp from "../features/auth/pages/VerifyResetOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";
import UserProfile from "../features/auth/pages/UserProfile";

 
import Nav from "../features/home/Nav";
import HeroSection from "../features/home/HeroSection";
import About from "../features/home/About";
import Services from "../features/home/Services";
import Contact from "../features/home/Contact";
import Home from "../features/home/home";

 
 import Wallet from "../features/dashboard/pages/wallet/ui/Wallet";
import Dashboards from "../features/dashboard/pages/Dashboards";

const AppRoutes = createBrowserRouter([
 
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "hero",
        element: <HeroSection />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // AUTHENTICATION ROUTES
  // Only Logout users can access
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/verify-reset-otp",
        element: <VerifyResetOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  // PRIVATE DASHBOARD ROUTES
  // Only Login users can access
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <Dashboards />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
    ],
  },
]);

export default AppRoutes;