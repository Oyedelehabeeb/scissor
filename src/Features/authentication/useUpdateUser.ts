import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../Services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success("User data updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Failed to update user data. Please try again.");
    },
  });
  return { updateUser, isUpdating };
}
