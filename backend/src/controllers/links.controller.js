import { createLinkService, getLinksByUsernameService, incrementLinkClickService } from "../services/link.service.js";
import ApiResponse from "../utils/apiResponse.js";

// Controller: create a new link for the authenticated user
export const createLinkController = async (req, res) => {
    const newLink = await createLinkService({
        user: req.user,
        body: req.body,
    });
    return res.status(201).json(new ApiResponse("Link created successfully", { newLink }));
};

// Controller: retrieve all links for a given username
// Note: route currently protected by `authMiddleware`. Consider exposing a public endpoint for unauthenticated views.
export const getLinksByUsernameController = async (req, res) => {
    const links = await getLinksByUsernameService(req.params);
    return res.status(200).json(new ApiResponse("Link retrieved  successfully", { links }));
};

// Controller: increment click counter for a link
// Expects `req.params.linkId` and requires authentication in current setup.
export const incrementLinkClickController = async (req, res) => {
    const link = await incrementLinkClickService(req.params);
    return res.status(200).json(new ApiResponse("Link incremented  successfully", { link }));
};