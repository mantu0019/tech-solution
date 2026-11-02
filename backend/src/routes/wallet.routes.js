import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { addMoneyController } from "../controllers/wallet.controller.js";
import { verifyPaymentController } from "../controllers/verify-payment.controller.js";
import { razorpayWebhookController } from "../controllers/razorpay-webhook.controller.js";

const walletRouter = Router();

walletRouter.post("/add-money",authMiddleware,addMoneyController)
walletRouter.post("/verify-payment",authMiddleware,verifyPaymentController)
walletRouter.post("/razorpay-webhook",razorpayWebhookController)
 
export default  walletRouter;