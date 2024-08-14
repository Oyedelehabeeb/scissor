import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useLogin } from "./useLogin";
import { loginWithProvider } from "../Services/apiAuth";
import MiniLoader from "../ui/MiniLoader";
import { motion } from "framer-motion";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const { login, isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginFormInputs> = ({ email, password }) => {
    if (!email || !password) return;
    login({ email, password }, { onSettled: () => reset() });
  };

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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {isLoading ? (
            <MiniLoader />
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              Login
            </button>
          )}
        </form>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => loginWithProvider("google")}
            className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            disabled={isLoading}
          >
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
          <button
            onClick={() => loginWithProvider("github")}
            className="flex items-center bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
            disabled={isLoading}
          >
            <FaGithub className="mr-2" />
            Login with GitHub
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
