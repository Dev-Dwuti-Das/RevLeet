import { Outlet } from "react-router-dom";
import Navbar from "../components/common/home_nav";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
