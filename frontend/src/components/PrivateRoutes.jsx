import React from 'react'
import useAuth from '../features/auth/hooks/useAuth'
import Loading from './Loading';
import { Navigate, Outlet } from 'react-router';

const PrivateRoutes = () => {
  const {authData,isLoading}  = useAuth();
   
 if(isLoading){
    return <Loading/>
 }

  return  authData ? <Outlet/> : <Navigate to={"/"} replace/>
}

export default PrivateRoutes