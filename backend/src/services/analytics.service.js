import userModel from "../models/auth.model.js";
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";

// Analytics service:
// Aggregates link-level data for a given username and validates that the requester
// is the same user (ownership enforcement).
export const getAnalyticsByUsernameService = async ({ username, requesterId }) => {
  const user = await userModel.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Ensure the authenticated requester is the owner of the requested username
  if (user._id.toString() !== requesterId) {
    throw new ApiError(403, "Unauthorized to access analytics for this user");
  }

  // Fetch links and compute basic aggregates
  const links = await Link.find({ user: user._id }).sort({ clicks: -1 });

  const totalLinks = links.length;
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0);

  const mostClicked = links[0] || null;
  const leastClicked = links.slice().sort((a, b) => (a.clicks || 0) - (b.clicks || 0))[0] || null;

  // Last 7 days activity (approximation using updatedAt and aggregated clicks)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    last7Days.push({ date: d.toISOString().slice(0, 10), clicks: 0 });
  }

  const now = new Date();
  links.forEach((link) => {
    if (link.updatedAt) {
      const updated = new Date(link.updatedAt);
      // if within last 7 days, attribute this link's clicks to that day
      const diff = Math.floor((now - updated) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff < 7) {
        const idx = 6 - diff;
        last7Days[idx].clicks += link.clicks || 0;
      }
    }
  });

  const linksData = links.map((l) => ({
    id: l._id,
    title: l.title,
    url: l.url,
    totalClicks: l.clicks || 0,
    createdDate: l.createdAt,
    lastClickedDate: l.updatedAt,
  }));

  const recentActivity = links
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10)
    .map((l) => ({ title: l.title, url: l.url, clicks: l.clicks || 0, lastClickedDate: l.updatedAt }));

  return {
    totalLinks,
    totalClicks,
    links: linksData,
    mostClicked: mostClicked ? { title: mostClicked.title, clicks: mostClicked.clicks || 0 } : null,
    leastClicked: leastClicked ? { title: leastClicked.title, clicks: leastClicked.clicks || 0 } : null,
    last7Days,
    recentActivity,
  };
};

export default { getAnalyticsByUsernameService };
