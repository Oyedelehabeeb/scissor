import React, { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Required for react-chartjs-2
import { FaLink, FaQrcode, FaMousePointer } from "react-icons/fa";
import { supabase } from "../Services/supabase";

interface AnalyticsData {
  shortenedUrlCount: number;
  qrCodeCount: number;
  totalClicks: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const { data: links, error } = await supabase
          .from("links")
          .select("id, number_of_clicks");

        if (error) {
          console.error("Error fetching analytics data:", error);
          return;
        }

        if (links) {
          const shortenedUrlCount = links.length;
          const qrCodeCount = shortenedUrlCount;
          const totalClicks = links.reduce(
            (sum, link) => sum + link.number_of_clicks,
            0
          );

          setAnalyticsData({
            shortenedUrlCount,
            qrCodeCount,
            totalClicks,
          });
        }
      } catch (error) {
        console.error("Unexpected error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-gray-600 dark:text-gray-200 text-lg">
          Loading analytics data...
        </div>
      </div>
    );
  }

  const { shortenedUrlCount, qrCodeCount, totalClicks } = analyticsData;

  // Dataa for pie chart
  const chartData = {
    labels: ["Shortened URLs", "Generated QR Codes", "Total Clicks"],
    datasets: [
      {
        data: [shortenedUrlCount, qrCodeCount, totalClicks],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8">
          Analytics Dashboard
        </h1>

        <div className="flex justify-center mb-8">
          <div className="w-64 h-64">
            <Pie data={chartData} />
          </div>
        </div>

        <div className="flex justify-between text-center">
          <div className="flex-1">
            <FaLink className="text-4xl mx-auto mb-2 text-green-600" />
            <h3 className="text-xl font-semibold">Shortened URLs</h3>
            <p className="text-2xl">{shortenedUrlCount}</p>
          </div>

          <div className="flex-1">
            <FaQrcode className="text-4xl mx-auto mb-2 text-orange-600" />
            <h3 className="text-xl font-semibold">Generated QR Codes</h3>
            <p className="text-2xl">{qrCodeCount}</p>
          </div>

          <div className="flex-1">
            <FaMousePointer className="text-4xl mx-auto mb-2 text-red-600" />
            <h3 className="text-xl font-semibold">Total Clicks</h3>
            <p className="text-2xl">{totalClicks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
