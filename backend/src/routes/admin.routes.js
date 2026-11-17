import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllServiceRequestController } from "../controllers/adminServiceController.js";
import adminMiddleware from "../middleware/admin.middleware.js";
const adminRouter = Router();

adminRouter.get(
  "/services",
  authMiddleware,
  adminMiddleware,
  getAllServiceRequestController,
);


export default adminRouter;
