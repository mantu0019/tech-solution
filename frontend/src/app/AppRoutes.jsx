import { createBrowserRouter } from "react-router-dom";

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
import DashboardAsideBar from "../features/dashboard/pages/DashboardAsideBar";
import Wallet from "../features/dashboard/pages/wallet/ui/Wallet";
      
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        element: <Nav />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/hero",
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

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-reset-otp",
        element: <VerifyResetOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <DashboardAsideBar/>,
      },
      {
        path:"profile",
       element:<UserProfile/>
      },
      {
        path:"wallet",
        element:<Wallet/>
      }
    ],
  },
]);

export default AppRoutes;
