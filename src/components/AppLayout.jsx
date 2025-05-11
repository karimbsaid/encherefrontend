import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
