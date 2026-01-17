import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context";

export default function ProtectedRoute({ children }) {
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
