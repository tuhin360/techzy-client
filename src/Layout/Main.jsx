import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import { useEffect } from "react";
import ContactButtonOnCorner from "../components/ContactButtonOnCorner/ContactButtonOnCorner";
import SharedScrollToTop from "../components/SharedScrollToTop/SharedScrollToTop";

const Main = () => {
  const location = useLocation();

  // login আর register path এ Navbar, Footer hide হবে
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  // ✅ scroll to top when route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll effect
    });
  }, [location.pathname]);

  return (
    <div>
      {!noHeaderFooter && <Navbar />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
      <ContactButtonOnCorner />
      <SharedScrollToTop />
    </div>
  );
};

export default Main;
