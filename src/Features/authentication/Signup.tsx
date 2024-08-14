import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignup } from "./useSignup";
import { motion } from "framer-motion";

interface SignUpFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const { signup, isLoading } = useSignup();

  const onSubmit: SubmitHandler<SignUpFormInputs> = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  const password = watch("password");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex justify-center items-center min-h-screen"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(0deg, #0062E6, #33AEFF)",
              "linear-gradient(60deg, #33AEFF, #1E90FF)",
              "linear-gradient(120deg, #1E90FF, #4169E1)",
              "linear-gradient(180deg, #4169E1, #0062E6)",
              "linear-gradient(240deg, #0062E6, #33AEFF)",
              "linear-gradient(300deg, #33AEFF, #1E90FF)",
              "linear-gradient(360deg, #1E90FF, #0062E6)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
