// main.jsx
import "../src/index.css"
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context";
import ProtectedRoute from "./ProtectedRoute";


import Homelayout from "./layout/homelayout";
import About from "./pages/queues/about";
import PublicLayout from "./layout/publiclayout";
import Landing from "./pages/queues/Landing";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Home from "./pages/home/home_wrap";
import WorkingQueues from "./pages/queues/Working_queue_wrap";
import WaitingQueues from "./pages/queues/Waiting_queue_wrap";


const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Navigate to="/landing" replace /> },
      { path: "landing", element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About/> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Homelayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "WorkingQueues", element: <WorkingQueues /> },
          { path: "WaitingQueues", element: <WaitingQueues /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      theme="dark"
      toastOptions={{
        duration: 1500,
        style: {
          background: "#111111",
          color: "#e5e7eb",
          border: "1px solid rgba(168, 85, 247, 0.35)",
          borderRadius: "14px",
        },
        classNames: {
          success: "!text-green-400 !border-green-500/40",
          error: "!text-red-400 !border-red-500/40",
          warning: "!text-amber-300 !border-amber-500/40",
          info: "!text-cyan-300 !border-cyan-500/40",
        },
      }}
    />
  </AuthProvider>
);
