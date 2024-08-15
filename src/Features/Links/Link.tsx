import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../Services/apiLinks";
import LinkItem from "./ListItem";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";

const Link: React.FC = () => {
  const { data: links } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredLinks, setFilteredLinks] = useState(links || []);

  const navigate = useNavigate();

  // Update filteredLinks whenever links or searchQuery changes
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

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="p-4">
      {/* Flex container for Back button and search input */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>

        {/* Search Bar */}
        <Input onSearch={handleSearch} />
      </div>

      {filteredLinks.length === 0 ? (
        <div className="text-center py-[150px]">
          <p className="text-3xl text-gray-600 dark:text-slate-300">
            No shortened links found. Try to create one.
          </p>
          <button
            onClick={handleGoHome}
            className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700 transition dark:bg-slate-700 dark:hover:bg-black dark:hover:text-white"
          >
            Go Home
          </button>
        </div>
      ) : (
        <div>
          {/* List of Links */}
          {filteredLinks.map((link) => (
            <LinkItem link={link} key={link.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Link;
