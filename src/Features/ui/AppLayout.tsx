import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <SideBar />
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="fixed top-0 left-0 lg:left-64 right-0 bg-white z-40 shadow-md">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <span className="text-lg font-semibold">Scissor</span>
          </div>
          <div className="hidden lg:block">
            <Header />
          </div>
        </header>
        <main className="flex-1 mt-16 p-4 sm:p-6 md:p-8 lg:p-14 overflow-y-auto dark:bg-gray-500">
          <Outlet />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AppLayout;
