import React, { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDetails: React.FC = () => {
  const { user } = useUser();
  const email = user?.email || "";
  const currentFullName = user?.user_metadata?.fullName || "";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { updateUser, isUpdating } = useUpdateUser();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName) return;

    updateUser({ fullName, avatar: avatar || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl dark:bg-slate-700 mx-auto p-4 sm:p-6 md:p-8 lg:p-10 mt-8 rounded-lg"
    >
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 mb-8 dark:bg-slate-700">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 dark:text-slate-500 text-center">
          Account Details
        </h3>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed dark:bg-slate-900 text-gray-600"
            disabled
            value={email}
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-900 text-gray-600"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Avatar Image */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="avatar"
          >
            Avatar Image
          </label>
          <input
            id="avatar"
            type="file"
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-900 text-gray-600"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition dark:bg-slate-500 dark:hover:bg-black duration-200"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Details"}
        </button>
      </div>
    </form>
  );
};

export default UpdateUserDetails;
