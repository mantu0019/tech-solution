 
import express from "express";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import errorMiddleware from "./middleware/error.middleware.js";

import authRouter from "./routes/user.routes.js";
import walletRouter from "./routes/wallet.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Razorpay webhook: raw body must be available for signature verification
app.use(
  "/api/wallet/razorpay-webhook",
  express.raw({ type: "application/json" })
);

// Normal API requests
app.use(express.json());

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/wallet", walletRouter);

app.get("/", (req, res) => {
  res.send("working....");
});

// Error middleware should be last
app.use(errorMiddleware);

export default app;
 
