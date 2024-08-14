import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate("/login", { replace: true });
      }
    },
    [isLoading, isAuthenticated, navigate]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
