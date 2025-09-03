import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import { Shop } from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: <Registration/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
    ],
  },
]);
