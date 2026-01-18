import LandingNavbar from "../components/common/landing_nav";
import { useAuth } from "../context";
import { Outlet } from "react-router-dom";
export default function PublicLayout() {


  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
}
