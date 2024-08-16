import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchShortenedUrl, insertShortenedUrl } from "../Services/apiLinks";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import QRCode from "qrcode.react";

const Dashboard: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

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
      refetch();
      setIsModalOpen(true);
    },
  });

  const handleShorten = () => {
    if (!originalUrl || shortenedUrl) {
      return;
    }

    const uniqueString = `scissor/${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    mutation.mutate({ originalUrl, uniqueString });
  };

  const handleCopyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      toast.success("URL copied to clipboard!");
    }
  };

  const handleDownloadQRCode = () => {
    const qrCodeCanvas = qrCodeRef.current?.querySelector("canvas");
    if (qrCodeCanvas) {
      const qrCodeUrl = qrCodeCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeUrl;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOriginalUrl("");
  };

  return (
    <section className="bg-gray-100 text-center py-8 px-4 sm:py-12 md:py-16 lg:py-24 dark:bg-slate-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 dark:text-gray-200">
          Welcome to Scissor!
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 dark:text-slate-300">
          Scissor - The Ultimate URL Shortener for Effortless Link Management |
          Shorten, Customize, and Share URLs with Ease. Boost Your Click-Through
          Rates, Generate QR Codes, and Track Analytics in One Simple Platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none"
          />
          <button
            onClick={handleShorten}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md sm:rounded-l-none hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black dark:hover:text-white"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          Scissor thinks it can disrupt the URL-shortening industry and give the
          likes of bit.ly and ow.ly a run for their money within two years.
        </p>
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] mx-auto text-center dark:bg-gray-600 relative">
            <Dialog.Title className="text-lg font-bold mb-4 dark:text-slate-300">
              Your shortened link is ready!
            </Dialog.Title>
            <div className="flex flex-col sm:flex-row justify-around items-center p-3 sm:p-4 md:p-5 rounded-md mb-4 bg-stone-200 dark:bg-stone-900">
              <span className="dark:text-slate-700 mb-2 sm:mb-0">
                Shortened URL:
              </span>
              <a
                href={shortenedUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all mr-2 dark:text-slate-500 dark:hover:text-slate-300 mb-2 sm:mb-0"
              >
                {shortenedUrl}
              </a>
              <button
                onClick={handleCopyToClipboard}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black"
              >
                Copy
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowQrCode(!showQrCode)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black"
              >
                {showQrCode ? "Hide QR Code" : "Show QR Code"}
              </button>
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black"
              >
                Share
              </button>
            </div>
            {showQrCode && (
              <div className="flex flex-col items-center mt-4">
                <div ref={qrCodeRef}>
                  <QRCode value={shortenedUrl || ""} size={128} />
                </div>
                <button
                  onClick={handleDownloadQRCode}
                  className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-black"
                >
                  Download QR Code
                </button>
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
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            )}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Dashboard;
