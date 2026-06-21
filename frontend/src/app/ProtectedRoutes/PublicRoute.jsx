import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
                let {user,isLoading}=useSelector((store)=>store.auth)
    if(isLoading) return <h1>Loading...</h1>
        if(user){
        return <Navigate to="/home" />
        
    }else
    {

        return <Outlet/>
    }
}

export default PublicRoute
