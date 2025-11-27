import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/home_wrap.jsx';
import Navbar from './components/common/header.jsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";



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
