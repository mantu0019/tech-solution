import apiInstance from "../../../app/api"

export const adminServices = async()=>{
 
const res  = await apiInstance.get("/api/admin/services");
return res.data;

 
    
}