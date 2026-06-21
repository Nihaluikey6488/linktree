import React, { useEffect, useState } from "react";
import useLinks from "../../hooks/useLinks";
import { useParams } from "react-router";
import LinkCard from "../components/LinkCard";

const Profile = () => {
  const { username } = useParams();
  const { getLinksByUsername, incrementClick } = useLinks();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getLinksByUsername(username);
        setLinks(res || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [username]);

  const handleClick = async (link) => {
    try {
      await incrementClick(link._id);
    } catch (err) {
      // ignore errors for unauthenticated visitors
    }
    window.location.href = link.url;
  };

  const initials = (username || "U").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-xl">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl">
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white mb-4">
            {initials}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{username}</h1>
          <p className="text-gray-600 mt-2">Links curated by {username}</p>

          <div className="mt-8 space-y-4">
            {links.map((l) => (
              <LinkCard key={l._id} link={l} onClick={handleClick} showClicks={false} />
            ))}
            {links.length === 0 && <div className="text-gray-600">No links yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
