import { createBrowserRouter } from "react-router";
import PublicRoutes from "../components/PublicRoutes";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ResendOtp from "../features/auth/pages/ResendOtp";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import VerifyResetOtp from "../features/auth/pages/VerifyResetOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";
import PrivateRoutes from "../components/PrivateRoutes";
import UserProfile from "../features/auth/pages/UserProfile";
 
  const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "resend-otp", element: <ResendOtp /> },
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
    path:"/home",
    element:<PrivateRoutes/>,
    children:[
      {
      index:true,
        element:<UserProfile/>
      }
      
    ]
  }
]);


 export default AppRoutes