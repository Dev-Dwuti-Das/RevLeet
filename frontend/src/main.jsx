import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/common/home_nav.jsx";
import Home from "./pages/home/home_wrap.jsx";
import WorkingQueues from "./pages/queues/Working_queue_wrap.jsx";
import WaitingQueues from "./pages/queues/Waiting_queue_wrap.jsx";
import Landing from "./pages/queues/Landing.jsx";
import Login from "./pages/Auth/login.jsx";
import Signup from "./pages/Auth/signup.jsx";
import About from "./pages/queues/about.jsx";
import { Toaster } from "sonner";
import { AuthProvider } from "./context.jsx";

const router = createBrowserRouter([
  {
    element: <Navbar />, // ✅ Navbar INSIDE router
    children: [
      { path: "/", element: <Navigate to="/landing" replace /> },
      { path: "landing", element: <Landing /> },
      { path: "home", element: <Home /> },
      { path: "WorkingQueues", element: <WorkingQueues /> },
      { path: "WaitingQueues", element: <WaitingQueues /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <div>Not found</div> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
