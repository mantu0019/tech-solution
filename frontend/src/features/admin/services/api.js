import apiInstance from "../../../app/api";

export const adminServices = async ({
  page = 1,
  limit = 10,
  status = "all",
  search = "",
} = {}) => {
  const params = {
    page,
    limit,
    ...(status !== "all" && { status }),
    ...(search.trim() && { search: search.trim() }),
  };

  const res = await apiInstance.get("/api/admin/services", {
    params,
  });

  return res.data;
};

export const updateServices = async ({
  adminMessage,
  status,
  requestId,
  resultFile,
}) => {
  const formData = new FormData();

  formData.append("status", status);
  formData.append("adminMessage", adminMessage || "");

  if (resultFile) {
    formData.append("resultFile", resultFile);
  }

  const res = await apiInstance.patch(
    `/api/admin/services/${requestId}`,
    formData
  );

  return res.data;
};