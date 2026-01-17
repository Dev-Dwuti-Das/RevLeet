import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";
import LandingNavbar from "../components/common/landing_nav";

export default function PublicLayout() {
  const { loggedIn, loading } = useAuth();

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Checking session…
    </div>
  );
}


  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
}
