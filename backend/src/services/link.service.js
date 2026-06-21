
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js"
import userModel from "../models/auth.model.js";

export const  createLinkService=async({ user, body })=>{
    console.log("user",user)
    let {title,url}=body
    if (!title || !url) {
        throw new ApiError(409,"Title and URL are required")
    }
    const newLink = await Link.create({
            user: user.id,
            title,
            url,
        });
    return newLink;
}

    
 export const getLinksByUsernameService=async(data)=>{
    let {username}=data
    const user=await userModel.findOne({username})
    if (!user) {
        throw new ApiError(404,"User not found")
    }
    const links = await Link.find({ user: user._id });
return links;




 }

export const incrementLinkClickService = async (data) => {

    const { linkId } = data

    const link = await Link.findById(linkId);

    if (!link) {
        throw new ApiError(404,"Link not found")
    }

    link.clicks += 1;
    await link.save();

    return link
}