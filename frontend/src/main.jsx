import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home_wrap.jsx';
import Navbar from './components/common/header.jsx';
import WorkingQueues from './pages/queues/Working_queue_wrap.jsx';
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import WaitingQueues from './pages/queues/Waiting_queue_wrap.jsx';
import About from './pages/queues/about.jsx';
import Landing from './pages/queues/Landing.jsx';
import Login from './pages/Auth/login.jsx';

import Signup from './pages/Auth/signup.jsx';
import { Toaster } from "sonner";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/landing" replace />
  },
  {
    path: "home",
    element: <Home/>,
  },
  {
    path: "WorkingQueues",
    element: <WorkingQueues/>,
  },
  {
    path: "WaitingQueues",
    element: <WaitingQueues/>,
  },
  {
    path: "about",
    element: <About/>,
  },
  {
    path: "Landing",
    element: <Landing/>,
  },
  {
    path: "signup",
    element: <Signup/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "*",
    element: <div>Non found</div>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        duration: 1500,
        style:{
          background:"black",
          borderRadius:"18px",
          border:"#720FB9",
          borderStyle:"solid",
          borderWidth:"2px",
          fontSize:"15px",
          fontWidth:700
        }
        
      }}
    />
  </StrictMode>,
)
