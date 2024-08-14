import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchShortenedUrl, insertShortenedUrl } from "../Services/apiLinks";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import QRCode from "qrcode.react";

const Dashboard: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  const { data: shortenedUrl, refetch } = useQuery<string | null>(
    ["shortenedUrl", originalUrl],
    () => fetchShortenedUrl(originalUrl),
    {
      enabled: false,
    }
  );

  const mutation = useMutation({
    mutationFn: ({
      originalUrl,
      uniqueString,
    }: {
      originalUrl: string;
      uniqueString: string;
    }) => insertShortenedUrl(originalUrl, uniqueString),
    onSuccess: () => {
      refetch(); // Refresh the shortened URL
      setIsModalOpen(true); // Open modal on success
    },
  });

  // Handle URL shortening
  const handleShorten = () => {
    if (!originalUrl || shortenedUrl) {
      return; // Do nothing if there's no original URL or if URL is already shortened
    }

    const uniqueString = `scissor/${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    mutation.mutate({ originalUrl, uniqueString });
  };

  // Handle copying to clipboard
  const handleCopyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      toast.success("URL copied to clipboard!");
    }
  };

  return (
    <section className="bg-gray-100 text-center py-16 px-4 dark:bg-slate-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Brief is the New Black
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 dark:text-slate-300">
          Scissor is a simple tool that makes URLs as short as possible. We
          believe brevity is the key to success in today’s fast-paced world.
          Whether it’s music, speeches, or wedding receptions, the new black is
          brief.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleShorten}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black dark:hover:text-white"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Scissor thinks it can disrupt the URL-shortening industry and give the
          likes of bit.ly and ow.ly a run for their money within two years.
        </p>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="bg-white p-8 rounded-md max-w-[900px] mx-auto text-center dark:bg-gray-600">
            <DialogTitle className="text-2xl font-bold mb-4 dark:text-slate-300">
              Your shortened link is ready!
            </DialogTitle>
            <div className="flex justify-around items-center p-5 rounded-md mb-4 bg-stone-200 dark:bg-stone-900">
              <div></div>
              <span className="dark:text-slate-700">Shortened URL:</span>
              <a
                href={shortenedUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words mr-2 dark:text-slate-500 dark:hover:text-slate-300"
              >
                {shortenedUrl}
              </a>
              <button
                onClick={() => handleCopyToClipboard()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 dark:bg-slate-500 dark:hover:bg-black"
            >
              {showQrCode ? "Hide QR Code" : "Show QR Code"}
            </button>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 ml-4 dark:bg-slate-500 dark:hover:bg-black"
            >
              Share
            </button>
            {showQrCode && (
              <div className="flex justify-center mt-4">
                <QRCode value={shortenedUrl || ""} />
              </div>
            )}
            {showShareOptions && (
              <div className="flex justify-around mt-4 bg-stone-200 py-3 rounded dark:bg-stone-900">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaTwitter size={28} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <FaWhatsapp size={28} />
                </a>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
};

export default Dashboard;
