import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  RiHome2Line,
  RiUser3Line,
  RiLinksLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { logout } from "../Services/apiAuth";

const SideBar: React.FC = () => {
  function handleLogoutClick() {
    logout();
  }

  return (
    <div className="w-64 bg-white border-r border-stone-200 shadow-md text-stone-600 h-full flex flex-col py-8 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-200 transition-all duration-300">
      {/* Logo */}
      <NavLink to="/" className="flex items-center justify-center h-20 mb-8">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-700">
          <span className="text-white font-bold text-xl">Scissor</span>
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-3 px-6 flex items-center rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-stone-300 hover:text-blue-500 dark:hover:bg-slate-700"
            }`
          }
        >
          <RiHome2Line className="text-2xl mr-3" />
          <span className="text-lg font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `py-3 px-6 flex items-center rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-stone-300 hover:text-blue-500 dark:hover:bg-slate-700"
            }`
          }
        >
          <RiUser3Line className="text-2xl mr-3" />
          <span className="text-lg font-medium">Profile</span>
        </NavLink>

        <NavLink
          to="/link"
          className={({ isActive }) =>
            `py-3 px-6 flex items-center rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-stone-300 hover:text-blue-500 dark:hover:bg-slate-700"
            }`
          }
        >
          <RiLinksLine className="text-2xl mr-3" />
          <span className="text-lg font-medium">Link</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `py-3 px-6 flex items-center rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-stone-300 hover:text-blue-500 dark:hover:bg-slate-700"
            }`
          }
        >
          <GrAnalytics className="text-2xl mr-3" />
          <span className="text-lg font-medium">Analytics</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `py-3 px-6 flex items-center rounded-lg transition-all duration-300
            ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "hover:bg-stone-300 hover:text-blue-500 dark:hover:bg-slate-700"
            }`
          }
        >
          <RiSettings3Line className="text-2xl mr-3" />
          <span className="text-lg font-medium">Settings</span>
        </NavLink>
      </nav>

      <div className="px-4 mt-auto">
        <Link
          to="/login"
          className="py-3 px-6 flex items-center justify-center rounded-lg transition-all duration-300 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
          onClick={handleLogoutClick}
        >
          <RiLogoutBoxRLine className="text-2xl mr-3" />
          <span className="text-lg font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
