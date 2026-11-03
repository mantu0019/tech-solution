import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { submitServiceController } from "../controllers/submitServiceController.js";

const serviceRouter = Router();

serviceRouter.post("/submit", authMiddleware, submitServiceController);

export default serviceRouter;
