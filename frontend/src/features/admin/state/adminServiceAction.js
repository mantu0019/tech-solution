import createAppAsyncThunk from "../../auth/state/createAsyncThunk";
import { adminServices } from "../services/api";

export  const adminServiceAction = createAppAsyncThunk("/api/admin/services",adminServices)