import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { llServiceRequestController,   } from "../controllers/submitServiceController.js";

const serviceRouter = Router();

serviceRouter.post("/ll-request", authMiddleware,llServiceRequestController);

export default serviceRouter;
