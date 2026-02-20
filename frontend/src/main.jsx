// main.jsx
import "../src/index.css";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context";
import ProtectedRoute from "./ProtectedRoute";
import "../src/index.css";


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
      { path: "about", element: <About /> },
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
]);

function isPhoneDevice() {
  const ua = navigator.userAgent || "";
  // Block phones only. Allow tablets and small laptops.
  const isPhoneUA =
    /iphone|ipod|android.*mobile|windows phone|iemobile|opera mini|blackberry|bb10|mobile/i.test(
      ua
    );
  const isNarrowTouchPhone =
    window.matchMedia("(max-width: 767px)").matches &&
    window.matchMedia("(pointer: coarse)").matches;

  return isPhoneUA || isNarrowTouchPhone;
}

function MobileBlockedScreen() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070d] text-white">

      {/* Background — EXACT STYLE */}
      {/* /* <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#000000]" /> */}
       {/* <div className="absolute -top-28 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-purple-600/40 blur-[160px]" /> */}
      <div className="absolute -left-24 top-[65%] h-[330px] w-[330px] rounded-full bg-fuchsia-600/50 blur-[110px] animate-[float-slow_18s_ease-in-out_infinite]" /> 
      <div className="absolute -right-25 top-[15%] h-[350px] w-[350px] rounded-full bg-purple-600/70 blur-[110px] animate-[float-reverse_22s_ease-in-out_infinite]" /> 
      <main className="relative z-10 flex min-h-screen items-center justify-center px-7 text-center">
        <section className="max-w-md">
<h1 className="text-3xl px-8 sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 heading-bottom1">
  Sorry
  <br />

  <span className="whitespace-nowrap">
    Mobile{" "}
    <span className="text-violet-500 heading-top4">
      Access
    </span>
  </span>

  <br />
  is currently
  <br />

  <span className="text-violet-500 heading-top4">
    Blocked.
  </span>
</h1>

          <p className="mt-8 text-lg leading-relaxed text-gray-300 hero-text1 ">
            Use desktop for the full experience
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
