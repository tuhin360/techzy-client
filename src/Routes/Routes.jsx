 
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/Home/Home/Home";
 
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
        element: <h3>About</h3>,
      },
      {
        path: "contact",
        element: <h3>Contact</h3>,
      },
    ],
  },
]);