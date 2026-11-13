import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getAllServiceRequestController } from "../controllers/adminServiceController";
import adminMiddleware from "../middleware/admin.middleware";
const adminRouter = Router();

adminRouter.get(
  "/services",
  authMiddleware,
  adminMiddleware,
  getAllServiceRequestController,
);

export default adminRouter;
