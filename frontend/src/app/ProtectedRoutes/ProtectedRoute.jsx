import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router'

const ProtectedRoute = () => {
    let {user,isLoading}=useSelector((store)=>store.auth)
    
  if(isLoading) return <h1>Loading...</h1>
    if(!user){
        return <Navigate to="/login" />
        
    }
    
  return <Outlet/>
}

export default ProtectedRoute
