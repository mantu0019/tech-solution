import createAppAsyncThunk from "../../auth/state/createAsyncThunk";
import { userDashboard } from "../services/api";

export const userDashboardAction = createAppAsyncThunk("/api/user/userDashboard",userDashboard);