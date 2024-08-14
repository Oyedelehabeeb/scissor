import React from "react";
import UpdateUserDetails from "./UpdateUserDetails";
import UpdateUserPassword from "./UpdateUserPassword";

const Settings: React.FC = () => {
  return (
    <div>
      <UpdateUserDetails />
      <UpdateUserPassword />
    </div>
  );
};

export default Settings;
