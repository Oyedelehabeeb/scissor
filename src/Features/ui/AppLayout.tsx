import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-200 h-full fixed top-0 left-0">
        <SideBar />
      </aside>
      <div className="flex flex-col flex-1 ml-64">
        <header className="fixed top-0 left-64 right-0 bg-white z-50 shadow-md">
          <Header />
        </header>
        <main className="flex-1 mt-16 p-6 overflow-y-auto dark:bg-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
