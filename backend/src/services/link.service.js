
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";
import userModel from "../models/auth.model.js";

// Create a link for the authenticated user
export const createLinkService = async ({ user, body }) => {
    const { title, url } = body;
    if (!title || !url) {
        throw new ApiError(409, "Title and URL are required");
    }
    const newLink = await Link.create({
        user: user.id,
        title,
        url,
    });
    return newLink;
};

// Return all links for a given username. Throws 404 if user not found.
export const getLinksByUsernameService = async (data) => {
    const { username } = data;
    const user = await userModel.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const links = await Link.find({ user: user._id });
    return links;
};

// Increment the clicks counter for a link by id.
// Note: this is a simple aggregated counter. For per-click logs, implement a separate Click model.
export const incrementLinkClickService = async (data) => {
    const { linkId } = data;
    const link = await Link.findById(linkId);
    if (!link) {
        throw new ApiError(404, "Link not found");
    }
    link.clicks += 1;
    await link.save();
    return link;
};