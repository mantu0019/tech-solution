import createAppAsyncThunk from "../../auth/state/createAsyncThunk";
import { llRequest } from "../services/api";

export const llRequestUser = createAppAsyncThunk("/api/services/ll-request",llRequest);