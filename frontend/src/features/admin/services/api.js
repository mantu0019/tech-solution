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