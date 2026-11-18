import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllServiceRequestController, updateServiceRequestController } from "../controllers/adminServiceController.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";
 const adminRouter = Router();

adminRouter.get(
  "/services",
  authMiddleware,
  adminMiddleware,
  getAllServiceRequestController,
);

adminRouter.patch("/services/:requestId",authMiddleware,adminMiddleware,upload.single("resultFile"),updateServiceRequestController)



export default adminRouter;
