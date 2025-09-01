 import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/Home/Home/Home";
import About from "../pages/About/About";
 
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "contact",
        element: <h3>Contact</h3>,
      },
    ],
  },
]);