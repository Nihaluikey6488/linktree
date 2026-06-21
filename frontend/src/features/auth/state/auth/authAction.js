import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../config/axiosInstance";
import { useDispatch } from "react-redux";

export  const loginEmployee=createAsyncThunk("api/auth/login",async(credentials,thunkApi)=>{
    try {
        let res=await axiosInstance.post("api/auth/login",credentials)
        // persist logged in user for session hydration
    try { localStorage.setItem('user', JSON.stringify(res.data.data)); } catch(e){}
       return res.data.data
        
        
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }

})

export const currentEmployee=createAsyncThunk("api/auth/me",async(_,thunkApi)=>{
     try {
        let res=await axiosInstance.get("api/auth/me")
    console.log(res.data)
       return res.data.data
        
        
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})



export let registerEmployee = createAsyncThunk(
    "api/auth/register",
    async (credentials, thunkApi) => {
        try {
            let res = await axiosInstance.post("api/auth/register", credentials);
            try { localStorage.setItem('user', JSON.stringify(res.data.data)); } catch(e){}
            return res.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);