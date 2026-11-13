import { config } from "dotenv";
config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from .env");
}

if (!process.env.PORT) {
  throw new Error("PORT is missing from .env");
}

if (!process.env.ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN is missing from .env");
}

if (!process.env.REFRESH_TOKEN) {
  throw new Error(" REFRESH_TOKEN is missing from .env");
}

if (!process.env.NODE_ENV) {
  throw new Error(" NODE_ENV is missing from .env");
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error(" GOOGLE_CLIENT_ID is missing from .env");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(" GOOGLE_CLIENT_SECRET is missing from .env");
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("GOOGLE_REFRESH_TOKEN is missing from .env");
}
if (!process.env.GOOGLE_USER) {
  throw new Error("GOOGLE_USER is missing from .env");
}
if (!process.env.OTP_EXPIRE_MINUTES) {
  throw new Error("OTP_EXPIRE_MINUTES is missing from .env");
}
if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID is missing from .env");
}
if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET is missing from .env");
}
if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
  throw new Error("RAZORPAY_WEBHOOK_SECRET is missing from .env");
}

if(!process.env.ENCRYPTION_KEY){
    throw new Error("ENCRYPTION_KEY is missing from .env");

}

const envConfig = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_USER: process.env.GOOGLE_USER,
  OTP_EXPIRE_MINUTES:process.env.OTP_EXPIRE_MINUTES,
  RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET:process.env.RAZORPAY_WEBHOOK_SECRET,
  ENCRYPTION_KEY:process.env.ENCRYPTION_KEY
};

export default envConfig;
