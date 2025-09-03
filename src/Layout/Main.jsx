import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  // console.log(location);
  
  // login আর register path এ Navbar, Footer hide হবে
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("signup");
    
  return (
    <div>
      {!noHeaderFooter && <Navbar />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
