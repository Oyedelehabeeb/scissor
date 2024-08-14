import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../Services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      localStorage.setItem("session", JSON.stringify(data.session));
      queryClient.setQueryData(["user"], data.user);
      console.log(data);
      navigate("/hero");
    },
    onError: () => {
      toast.error("Invalid credentials. Please try again.");
    },
  });
  return { login, isLoading };
}
