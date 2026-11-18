import apiInstance from "../../../app/api"

export const userDashboard = async()=>{
    const res = await apiInstance.get("/api/user/my-requests");
    return res.data;
};

export const downloadResult = async (requestId) => {
  const res = await apiInstance.get(
    `/api/user/my-requests/${requestId}/download`,
    {
      responseType: "blob",
    }
  );

  return res;
};