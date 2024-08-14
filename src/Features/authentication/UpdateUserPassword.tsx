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
      className="max-w-2xl mx-auto p-6 dark:bg-slate-700 mt-8 rounded-lg"
    >
      <h3 className="text-xl font-semibold mb-4 dark:text-slate-500">
        Change Password
      </h3>

      {/* New Password */}
      <div className="rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full px-4 py-2 border rounded-lg dark:bg-slate-800 ${
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
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full px-4 py-2 border rounded-lg dark:bg-slate-800 ${
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 dark:bg-slate-500 dark:hover:bg-black"
          disabled={isUpdating}
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default UpdateUserPassword;
