import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLinks from "../../hooks/useLinks";
import LinkCard from "../components/LinkCard";

const Dashboard = () => {
  const { getLinksByUsername, incrementClick, updateLink, deleteLink } = useLinks();
  const { user } = useSelector((s) => s.auth);
  const username = user?.user?.username || user?.username;
  const [links, setLinks] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const res = await getLinksByUsername(username);
        setLinks(res || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [username]);

  const handleCopyProfile = () => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url).then(() => alert("Profile link copied"));
  };

  const handleOpen = async (link) => {
    try {
      await incrementClick(link._id);
    } catch (err) {}
    window.open(link.url, "_blank");
  };

  

  // edit/delete removed per design

  const filtered = links.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()) || l.url.toLowerCase().includes(query.toLowerCase()));

  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0);

  const start = (page - 1) * perPage;
  const pageLinks = filtered.slice(start, start + perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const initials = (username || "U").slice(0, 2).toUpperCase();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home/create')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Create Link</button>
          <button onClick={handleCopyProfile} className="px-3 py-2 bg-gray-100 rounded-lg">Copy Profile</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white text-xl font-bold">{initials}</div>
            <div>
              <div className="font-semibold text-lg">{username}</div>
              <div className="text-sm text-gray-500">Welcome back — manage your links below.</div>
            </div>
          </div>

          <div className="mb-4">
            <input value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1)}} placeholder="Search links" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="space-y-4">
            {pageLinks.map((link) => (
              <div key={link._id} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <LinkCard link={link} onClick={handleOpen} />
                </div>
              </div>
            ))}
            {pageLinks.length === 0 && <div className="text-gray-500">No links found.</div>}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing {start + 1} - {Math.min(start + perPage, filtered.length)} of {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-100 rounded">Prev</button>
              <div className="px-3 py-1">{page} / {totalPages}</div>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 bg-gray-100 rounded">Next</button>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Summary</div>
          <div className="mt-3">
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-gray-600">Total Links</div>
              <div className="font-semibold">{links.length}</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-gray-600">Total Clicks</div>
              <div className="font-semibold">{totalClicks}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
