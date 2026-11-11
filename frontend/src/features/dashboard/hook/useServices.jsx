import { ReducerType } from "@reduxjs/toolkit"
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { llRequestUser } from "../state/servicesAction";

export const useService = ()=>{

 const {isLoading,error} = useSelector((state)=>state.services);
    const dispatch =  useDispatch()



 const llRequestByUser = useCallback((data)=>{
    return dispatch(llRequestUser(data)).unwrap();
 },[dispatch])
 
 return {isLoading,error,llRequestByUser};
}