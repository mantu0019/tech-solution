import apiInstance from "../../../app/api"

export const userDashboard = async()=>{
    const res = await apiInstance.get("/api/user/my-requests");
    return res.data;
}