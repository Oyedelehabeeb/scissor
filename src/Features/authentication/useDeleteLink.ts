import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import { deleteLink as deleteLinkApi } from "../Services/apiLinks";

interface UseDeleteLinkType {
  deleteLink: (id: string) => void;
  isLoading: boolean;
}

export function useDeleteLink(): UseDeleteLinkType {
  const { user } = useUser();
  const userId = user?.id;

  const queryClient = useQueryClient();

  const { mutate: deleteLinkMutate, isLoading } = useMutation({
    mutationFn: (id: string) => {
      if (!userId) {
        throw new Error("User ID is required to delete the link.");
      }
      return deleteLinkApi(id, userId);
    },
    onSuccess: () => {
      toast.success("Link deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => {
      toast.error("Failed to delete link. Please try again.");
    },
  });

  return {
    deleteLink: deleteLinkMutate,
    isLoading,
  };
}
