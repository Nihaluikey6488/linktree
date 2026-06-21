import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    "block px-4 py-2 rounded " + (isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100");

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 hidden md:block">
      <h3 className="text-lg font-semibold mb-4">Linktree</h3>
      <nav className="space-y-2">
        <NavLink to="/home" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/home/create" className={linkClass}>
          Create Link
        </NavLink>
        <NavLink to="/home/analytics" className={linkClass}>
          Analytics
        </NavLink>
        <NavLink to="/home/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
