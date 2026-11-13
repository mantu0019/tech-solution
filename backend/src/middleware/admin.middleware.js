import AppError from "../utils/appError";
import asyncHandler from "../utils/asyncHandler";

const adminMiddleware = asyncHandler(async(req,res,next)=>{

  if(!req.user){
    throw new AppError("Authentication required",401)
  };

  if(req.user.role !=="admin"){
    throw new AppError("Access denied. admin only.",403);
  };

  next();
 
});
export default adminMiddleware;