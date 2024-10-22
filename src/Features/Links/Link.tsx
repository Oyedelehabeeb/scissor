import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import LinkItem from "./ListItem";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { fetchUserLinks } from "../Services/apiLinks";

const Link: React.FC = () => {
  const { data: links } = useQuery({
    queryKey: ["links"],
    queryFn: fetchUserLinks,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredLinks, setFilteredLinks] = useState(links || []);

  const navigate = useNavigate();

  useEffect(() => {
    if (links) {
      const filtered = links.filter(
        (link) =>
          link.original_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.shortened_url.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLinks(filtered);
    }
  }, [links, searchQuery]);

  function handleGoHome() {
    navigate("/");
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-0 dark:text-slate-300 dark:hover:text-slate-400"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>

        <div className="w-full sm:w-auto">
          <Input onSearch={handleSearch} />
        </div>
      </div>

      {filteredLinks.length === 0 ? (
        <div className="text-center py-12 sm:py-24 md:py-36">
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-slate-300 mb-6">
            No shortened links found. Try to create one.
          </p>
          <button
            onClick={handleGoHome}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-md hover:bg-blue-700 transition dark:bg-slate-700 dark:hover:bg-black dark:hover:text-white"
          >
            Go Home
          </button>
        </div>
      ) : (
        <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredLinks.map((link) => (
            <LinkItem link={link} key={link.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Link;
