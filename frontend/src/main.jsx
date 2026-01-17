// main.jsx
import "../src/index.css"
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context";
import ProtectedRoute from "./ProtectedRoute";


import Homelayout from "./layout/homelayout";
import PublicLayout from "./layout/publiclayout";
import Landing from "./pages/queues/Landing";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Home from "./pages/home/home_wrap";
import WorkingQueues from "./pages/queues/Working_queue_wrap";
import WaitingQueues from "./pages/queues/Waiting_queue_wrap";

const router = createBrowserRouter([
  {
    element: <PublicLayout/>,
    children: [
      { path: "/", element: <Navigate to="/landing" replace /> },
      { path: "landing", element: <Landing /> },
      { path: "login", element:<Login />},
      { path: "signup", element: <Signup />},
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <Homelayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "home", element: <Home /> },
      { path: "WorkingQueues", element: <WorkingQueues /> },
      { path: "WaitingQueues", element: <WaitingQueues /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);