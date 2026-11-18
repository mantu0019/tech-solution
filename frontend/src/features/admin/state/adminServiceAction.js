import createAppAsyncThunk from "../../auth/state/createAsyncThunk";
import { adminServices, updateServices } from "../services/api";

export  const adminServiceAction = createAppAsyncThunk("/api/admin/services",adminServices);

export const updateServicesAction = createAppAsyncThunk("/api/admin/services/a/request",updateServices);

