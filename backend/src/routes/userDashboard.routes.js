import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { downloadResultController, getUserDashboardController } from "../controllers/userDashboardController/userDashbord.controller.js";
const userDashboardRouter = Router();
userDashboardRouter.get(
  "/my-requests",
  authMiddleware,
  getUserDashboardController,
);


userDashboardRouter.get("/my-requests/:requestId/download",authMiddleware,downloadResultController);

export default userDashboardRouter;
