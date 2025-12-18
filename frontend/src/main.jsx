import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home_wrap.jsx';
import Navbar from './components/common/header.jsx';
import WorkingQueues from './pages/queues/Working_queue_wrap.jsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import WaitingQueues from './pages/queues/Waiting_queue_wrap.jsx';
import About from './pages/queues/about.jsx';
import Landing from './pages/queues/Landing.jsx';

import Signup from './pages/Auth/signup.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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
    path: "*",
    element: <div>Non found</div>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <RouterProvider router={router} />
  </StrictMode>,
)
