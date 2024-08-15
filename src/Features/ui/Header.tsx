import React, { useState } from "react";
import { useUser } from "../authentication/useUser";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

const Header: React.FC = () => {
  const [dark, setDark] = useState(false);

  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName;
  const avatar = user?.user_metadata?.avatar;

  function darkModeHandler() {
    setDark(!dark);
    if (dark) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }

  return (
    <header className="bg-white shadow-md py-3 dark:bg-stone-900 dark:text-slate-300">
      <div className="container mx-auto px-10 py-3 flex items-center justify-between">
        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <button onClick={darkModeHandler}>
            {dark ? (
              <IoSunnyOutline size={24} className="hover:bg-gray-100" />
            ) : (
              <FaRegMoon size={24} className="hover:bg-gray-100" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-medium">{fullName}</span>
          <img
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold"
            src={avatar ? avatar : "default-user.jpg"}
            alt="User Avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
