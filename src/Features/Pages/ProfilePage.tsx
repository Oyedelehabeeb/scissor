import React, { useEffect, useState } from "react";
import ProfileHeader from "../UserProfile/ProfileHeader";
import ProfileStats from "../UserProfile/ProfileStats";
import UpdateUserDetails from "../authentication/UpdateUserDetails";
import UpdateUserPassword from "../authentication/UpdateUserPassword";
import { getAddress } from "../Services/apiGeocoding";

const ProfilePage: React.FC = () => {
  const [location, setLocation] = useState({
    address: "",
    city: "",

    state: "",
    country: "",
  });

  useEffect(() => {
    async function fetchLocation() {
      try {
        const positionObj = await getPosition();
        const position = {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        };

        const data = await getAddress(position);
        setLocation({
          address: data.locality || "Unknown address",
          city: data.city || "Unknown city",
          state: data.principalSubdivision || "Unknown state",
          country: data.countryName || "Unknown country",
        });
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    }

    fetchLocation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg dark:bg-slate-300 ">
      <h1 className="text-3xl font-semibold mb-6 dark:text-slate-500">
        Your Profile
      </h1>

      <div className="mb-8">
        <ProfileHeader />
      </div>

      <div className="mb-8">
        <ProfileStats />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 dark:bg-slate-700">
        <h2 className="text-2xl font-semibold mb-4 dark:text-slate-500">
          Location
        </h2>
        <p className="text-gray-700 dark:text-white">
          Address: <span className="font-medium">{location.address}</span>
        </p>
        <p className="text-gray-700 dark:text-white">
          City: <span className="font-medium">{location.city}</span>
        </p>
        <p className="text-gray-700 dark:text-white">
          State: <span className="font-medium">{location.state}</span>
        </p>
        <p className="text-gray-700 dark:text-white">
          Country: <span className="font-medium">{location.country}</span>
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 dark:bg-slate-700">
        {/* <h3 className="text-xl font-semibold mb-4 dark:text-white">
          
        </h3> */}
        <UpdateUserDetails />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 dark:bg-slate-700">
        {/* <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Change Password
        </h3> */}
        <UpdateUserPassword />
      </div>
    </div>
  );
};

// Function to get user's current position
function getPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default ProfilePage;
