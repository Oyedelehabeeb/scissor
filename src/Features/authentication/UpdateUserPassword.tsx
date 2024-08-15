import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

type FormData = {
  password: string;
  confirmPassword: string;
};

const UpdateUserPassword: React.FC = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password updated:", data.password);
    updateUser({ password: data.password });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 mt-8 rounded-lg dark:bg-slate-700"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 dark:text-slate-500 text-center">
        Change Password
      </h3>

      <div className="bg-white dark:bg-slate-800 shadow-md p-4 sm:p-6 md:p-8 rounded-lg">
        {/* New Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-gray-100 ${
              errors.password ? "border-red-500" : ""
            }`}
            disabled={isUpdating}
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full px-4 py-2 border rounded-lg dark:bg-slate-900 dark:text-gray-100 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            disabled={isUpdating}
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 dark:bg-slate-500 dark:hover:bg-black disabled:opacity-50"
          disabled={isUpdating}
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default UpdateUserPassword;
