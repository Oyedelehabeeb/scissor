import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../Services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: () => {
      toast.error("Failed to log out. Please try again.");
    },
  });
  return { isLoading, logout };
}
