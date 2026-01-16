
import { Outlet } from "react-router-dom";
import LandingNavbar from "../components/common/landing_nav";

export default function PublicLayout() {
  return (
    <>
      <LandingNavbar/>
      <Outlet />
    </>
  );
}
