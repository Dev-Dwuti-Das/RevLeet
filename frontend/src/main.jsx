// main.jsx
import "../src/index.css"
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
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

function isPhoneDevice() {
  const ua = navigator.userAgent || "";
  const isMobileUA = /android|iphone|ipod|iemobile|blackberry|mobile/i.test(ua);
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  return isMobileUA || (isSmallScreen && isCoarsePointer);
}

function MobileBlockedScreen() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070d] text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#060610] to-black" />
      <div className="absolute -top-20 -left-20 h-[380px] w-[380px] rounded-full bg-purple-500/25 blur-[120px]" />
      <div className="absolute -bottom-28 -right-16 h-[320px] w-[320px] rounded-full bg-indigo-500/20 blur-[110px]" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-black/65 p-7 text-center backdrop-blur-xl">
          <img src="/logo.png" alt="Revleet logo" className="mx-auto mb-5 h-14 w-auto object-contain" />
          <h1 className="text-2xl font-semibold tracking-tight">Desktop Required</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Use a desktop or laptop for the maximum potential of Revleet.
            Mobile access is currently disabled.
          </p>
        </section>
      </main>
    </div>
  );
}

function DesktopOnlyGate({ children }) {
  const [isBlocked, setIsBlocked] = useState(() => isPhoneDevice());

  useEffect(() => {
    const check = () => setIsBlocked(isPhoneDevice());
    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (isBlocked) return <MobileBlockedScreen />;
  return children;
}

createRoot(document.getElementById("root")).render(
  <DesktopOnlyGate>
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
  </DesktopOnlyGate>
);
