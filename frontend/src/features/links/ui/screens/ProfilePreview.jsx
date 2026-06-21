import React from "react";
import { useSelector } from "react-redux";

const ProfilePreview = () => {
  const { user } = useSelector((s) => s.auth);
  const username = user?.user?.username || user?.username;

  const url = `${window.location.origin}/${username}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    alert("Profile URL copied");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-2">Public profile URL:</div>
        <div className="flex items-center gap-4">
          <input readOnly value={url} className="flex-1 border px-3 py-2 rounded" />
          <button onClick={copy} className="px-4 py-2 bg-blue-600 text-white rounded">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
