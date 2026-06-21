import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
