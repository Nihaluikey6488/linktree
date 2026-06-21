import userModel from "../models/auth.model.js";
import ApiError from "../utils/apiError.js";

import genearateToken from "../utils/token.js";
export const registerService=async(data)=>{

    let {username,email,password}=data;
const isExisted=await userModel.findOne({email})
if(isExisted){
    throw new ApiError(409,"Email already exists")

}
const user=await userModel.create({
    username,
    email,
password})
let token =await genearateToken(user) 
return{
user,token

}
}