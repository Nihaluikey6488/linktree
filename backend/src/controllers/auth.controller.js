import { loginService, registerService } from "../services/auth.services.js"
import ApiResponse from "../utils/apiResponse.js"

export const registerController=async(req,res)=>{
    let {user,token}=await registerService(req.body)
    res.cookie("token",token,{httpOnly:true,
        maxAge:60*60*1000
        
    })
    return res.status(201).json(new ApiResponse("User registered successfully",{user}))
}


export const loginController=async(req,res)=>{
    let { user, token}=await loginService(req.body)
  
      res.cookie("token",token,{httpOnly:true,
        maxAge:60*60*1000
        
    })
   return res.status(200).json(new ApiResponse("Logged in successfully",{ user,
})) 
}
 