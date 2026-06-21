import { getAnalyticsByUsernameService } from "../services/analytics.service.js";
import ApiResponse from "../utils/apiResponse.js";

// Controller to return aggregated analytics for a username.
// Requires authentication and enforces that the requester matches the username owner.
export const getAnalyticsByUsernameController = async (req, res) => {
  const { username } = req.params;
  const requesterId = req.user?.id;

  const analytics = await getAnalyticsByUsernameService({ username, requesterId });

  return res.status(200).json(new ApiResponse("Analytics retrieved successfully", { analytics }));
};

export default { getAnalyticsByUsernameController };
