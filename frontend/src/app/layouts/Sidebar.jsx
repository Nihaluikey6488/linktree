import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Icon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case "dashboard":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      );
    case "create":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      );
    case "analytics":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M7 14v4M12 10v8M17 6v12" />
        </svg>
      );
    case "profile":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z" />
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const username = user?.user?.username || user?.username || "User";

  const NavItem = ({ to, icon, children, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 ${
          isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-gray-200" style={{ color: "inherit" }}>
        <Icon name={icon} className="w-5 h-5" />
      </span>
      <span className="font-medium">{children}</span>
    </NavLink>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r h-screen p-6 hidden md:flex flex-col sticky top-0 z-20">
        <div className="mb-6">
          <div className="text-xl font-bold">Linktree</div>
          <div className="text-sm text-gray-500 mt-1">Manage your links</div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">{username.slice(0,2).toUpperCase()}</div>
          <div>
            <div className="font-medium">{username}</div>
            <div className="text-xs text-gray-400">@{username}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem to="/home" icon="dashboard" end>Dashboard</NavItem>
          <NavItem to="/home/create" icon="create">Create Link</NavItem>
          <NavItem to="/home/analytics" icon="analytics">Analytics</NavItem>
          <NavItem to="/home/profile" icon="profile">Profile</NavItem>
        </nav>

        <div className="mt-6">
          <button className="w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Settings</button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 right-4 md:hidden bg-white bg-opacity-95 rounded-full shadow-lg flex items-center justify-between px-4 py-2 gap-2 z-30">
        <NavLink to="/home" className={({isActive}) => isActive ? "flex flex-col items-center text-indigo-600" : "flex flex-col items-center text-gray-600"}>
          <Icon name="dashboard" className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/home/create" className={({isActive}) => isActive ? "flex flex-col items-center text-indigo-600" : "flex flex-col items-center text-gray-600"}>
          <Icon name="create" className="w-6 h-6" />
          <span className="text-xs">Create</span>
        </NavLink>
        <NavLink to="/home/analytics" className={({isActive}) => isActive ? "flex flex-col items-center text-indigo-600" : "flex flex-col items-center text-gray-600"}>
          <Icon name="analytics" className="w-6 h-6" />
          <span className="text-xs">Analytics</span>
        </NavLink>
        <NavLink to="/home/profile" className={({isActive}) => isActive ? "flex flex-col items-center text-indigo-600" : "flex flex-col items-center text-gray-600"}>
          <Icon name="profile" className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
