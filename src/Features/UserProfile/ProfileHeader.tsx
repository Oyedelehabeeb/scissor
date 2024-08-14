import React from "react";
import { useUser } from "../authentication/useUser";

const ProfileHeader: React.FC = () => {
  const { user } = useUser();
  const avatarUrl = user?.user_metadata?.avatar || "";
  const fullName = user?.user_metadata?.fullName || "John Doe";
  const email = user?.email || "example@example.com";

  return (
    <div className="flex items-center p-6 bg-white shadow-md rounded-lg dark:bg-slate-700">
      <img
        src={avatarUrl ? avatarUrl : "default-user.jpg"}
        alt="User Avatar"
        className="w-20 h-20 rounded-full mr-4"
      />
      <div>
        <h2 className="text-2xl font-semibold dark:text-white">{fullName}</h2>
        <p className="text-gray-500 dark:text-slate-200">{email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
