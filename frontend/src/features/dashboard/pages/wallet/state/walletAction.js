import createAppAsyncThunk from "../../../../auth/state/createAsyncThunk";
import { addMoney, verifyPayment } from "../services/walletService";

export const addMoneyUser = createAppAsyncThunk("/app/wallet",addMoney);
export const verifyPaymentUser = createAppAsyncThunk("/api/wallet/verify-payment",verifyPayment)