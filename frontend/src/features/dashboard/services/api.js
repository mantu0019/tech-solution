import apiInstance from "../../../app/api";

export const llRequest = async ({
  applicationNumber,
  dob,
  password,
  state,
}) => {
  const res = await apiInstance.post("/api/service/ll-request", {
    applicationNumber,
    dob,
    password,
    state,
  });


  return res.data;
};
