import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context";

export default function ProtectedRoute() {
  const { loggedIn, loading, isDemo } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session…
      </div>
    );
  }

  if (!loggedIn && !isDemo) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
