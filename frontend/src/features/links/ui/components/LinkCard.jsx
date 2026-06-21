import React from "react";

const LinkCard = ({ link, onClick, onCopy, compact = false }) => {
  if (!compact) {
    return (
      <div className="w-full">
        <button
          onClick={() => onClick(link)}
          className="w-full text-left bg-white bg-opacity-90 hover:bg-opacity-100 transition-shadow duration-150 shadow-md hover:shadow-lg rounded-xl px-6 py-4 flex items-center justify-between"
        >
          <div>
            <div className="text-lg font-semibold text-gray-800">{link.title}</div>
            <div className="text-sm text-gray-500 mt-1 truncate max-w-xl">{link.url}</div>
          </div>
          <div className="text-sm text-gray-400">{link.clicks}</div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow flex items-center justify-between">
      <div>
        <h3 className="font-medium text-lg">{link.title}</h3>
        <p className="text-sm text-gray-500 truncate max-w-lg">{link.url}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onCopy(link)} className="px-3 py-1 bg-gray-100 rounded">Copy</button>
        <button onClick={() => onClick(link)} className="px-3 py-1 bg-blue-500 text-white rounded">Open</button>
      </div>
    </div>
  );
};

export default LinkCard;
