import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../Services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account created successfully!");
      navigate("/login");
    },
  });

  return { signup, isLoading };
}
