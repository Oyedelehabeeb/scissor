import React, { useEffect, useState } from "react";
import { FaTrash, FaMousePointer, FaCalendarAlt } from "react-icons/fa";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useDeleteLink } from "../authentication/useDeleteLink";
import QRCode from "qrcode.react";
import { supabase } from "../Services/supabase";

interface ListItemProps {
  link: {
    id: string;
    created_at: string;
    original_url: string;
    shortened_url: string;
    number_of_clicks: number;
  };
}

const ListItem: React.FC<ListItemProps> = ({ link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberOfClicks, setNumberOfClicks] = useState<number>(
    link.number_of_clicks || 0
  );
  const { id, created_at, original_url, shortened_url } = link;
  const { deleteLink, isLoading } = useDeleteLink();

  useEffect(() => {
    const updateClickCount = async () => {
      const { error } = await supabase
        .from("links")
        .update({ number_of_clicks: numberOfClicks })
        .eq("id", id);

      if (error) {
        console.error("Failed to update click count:", error);
      }
    };

    if (numberOfClicks > link.number_of_clicks) {
      updateClickCount();
    }
  }, [numberOfClicks, id, link.number_of_clicks]);

  const handleLinkClick = () => {
    setNumberOfClicks((prevCount) => prevCount + 1);
  };

  const handleDelete = async (id: string) => {
    try {
      deleteLink(id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  return (
    <>
      <div className="relative bg-white shadow-lg border rounded-lg p-4 mb-4 max-w-full max-h-screen overflow-hidden dark:bg-slate-700 dark:border-none">
        <button
          className="absolute top-4 right-2 text-stone-400 hover:text-red-800"
          onClick={() => setIsModalOpen(true)}
        >
          <FaTrash />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm flex items-center dark:text-stone-200">
              <FaCalendarAlt className="mr-2" />
              Created At: {new Date(created_at).toLocaleString()}
            </p>
          </div>
          <p className="text-gray-500 break-all mb-2 dark:text-stone-200">
            Original URL:{" "}
            <a
              href={original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
              onClick={handleLinkClick}
            >
              {original_url}
            </a>
          </p>
          <p className="text-gray-500 mb-2 dark:text-stone-200">
            Shortened URL:{" "}
            <a
              href={shortened_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
              onClick={handleLinkClick}
            >
              {shortened_url}
            </a>
          </p>
          <div className="flex-shrink-0 mb-2">
            <QRCode value={shortened_url} size={100} />
          </div>
          {/* Click Counter */}
          <div className="absolute bottom-6 right-2 flex items-center text-gray-500 text-sm dark:text-stone-200">
            <FaMousePointer className="mr-1" />
            <p>{numberOfClicks} clicks</p>
          </div>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="bg-white py-6 px-8 rounded-lg shadow-lg max-w-sm mx-auto text-center dark:bg-gray-600">
            <h3 className="text-xl font-semibold mb-4 dark:text-slate-300">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6 dark:text-slate-300">
              Are you sure you want to delete this link?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:bg-slate-500 dark:hover:bg-black dark:text-white"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={isLoading || !deleteLink}
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ListItem;
