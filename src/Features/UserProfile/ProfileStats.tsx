import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getLinks } from "../Services/apiLinks";
import PageNotFound from "../Pages/PageNotFound";
import Loader from "../ui/Loader";

interface LinksPropType {
  shortened_url: string;
}

const ProfileStats: React.FC = () => {
  const {
    data: links,
    isLoading,
    isError,
  } = useQuery<LinksPropType[]>({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !links) {
    return <PageNotFound />;
  }

  // Calculate stats based on the fetched data
  const stats = {
    urlsShortened: links.length,
    qrCodesGenerated: links.length, // Assuming each shortened URL has a corresponding QR code
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-white shadow-md rounded-lg dark:bg-slate-700">
      <div className="text-center">
        <h3 className="text-xl font-semibold dark:text-white">
          {stats.urlsShortened}
        </h3>
        <p className="text-gray-500 dark:text-slate-200">URLs Shortened</p>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold dark:text-white">
          {stats.qrCodesGenerated}
        </h3>
        <p className="text-gray-500 dark:text-slate-200">QR Codes Generated</p>
      </div>
    </div>
  );
};

export default ProfileStats;
