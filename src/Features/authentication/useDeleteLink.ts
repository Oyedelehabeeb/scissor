import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink as deleteLinkApi } from "../Services/apiLinks";
import toast from "react-hot-toast";

interface UseDeleteLinkType {
  deleteLink: (id: string) => void; // Updated type to void
  isLoading: boolean;
}

export function useDeleteLink(): UseDeleteLinkType {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteLinkApi(id),
    onSuccess: () => {
      toast.success("Link deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => {
      toast.error("Failed to delete link. Please try again.");
    },
  });

  return { deleteLink: mutation.mutate, isLoading: mutation.isLoading };
}
