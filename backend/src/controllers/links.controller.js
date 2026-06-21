import { createLinkService, getLinksByUsernameService, incrementLinkClickService } from "../services/link.service.js"
import ApiResponse from "../utils/apiResponse.js"

export const createLinkController=async(req,res)=>{
    let newLink=await createLinkService({
        user:req.user,
        body:req.body
    })
   return res.status(201).json(new ApiResponse("Link created successfully",{newLink}))
        
}

export const getLinksByUsernameController=async(req,res)=>{
    let links=await getLinksByUsernameService(req.params)
     return res.status(200).json(new ApiResponse("Link retrieved  successfully",{links}))
}

export const incrementLinkClickController=async(req,res)=>{
    const link=await incrementLinkClickService(req.params)
    return res.status(200).json(new ApiResponse("Link incremented  successfully",{link}))
}