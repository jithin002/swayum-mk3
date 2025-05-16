
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    // Reset redirect attempted flag when route changes
    return () => {
      setRedirectAttempted(false);
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swayum-orange"></div>
      </div>
    );
  }

  if (!user && !redirectAttempted) {
    // Set flag to prevent redirect loops
    setRedirectAttempted(true);
    console.log("User not authenticated in PrivateRoute, redirecting to auth with from:", location.pathname);
    // Save the current location so we can redirect back after login
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
