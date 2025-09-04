import { useState } from "react";
import {
  FaStore,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaListAlt,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cart] = useCart();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // TODO: get admin value from the database
  const isAdmin = true;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Overlay for Mobile/Tablet Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Dashboard Container */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 z-40 w-64 sm:w-72 h-full bg-gradient-to-b from-orange-600 to-orange-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:sticky lg:top-0 lg:translate-x-0 lg:w-72 lg:min-h-screen lg:bg-opacity-90 lg:backdrop-blur-md`}
        >
          <div className="p-6">
            {/* Logo */}
            <div className="mb-8 flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-200 hover:scale-105">
                Tech<span className="text-yellow-300">Zy</span>
              </h1>
            </div>

            {/* Dashboard Navigation */}
            <nav className="space-y-2">
              {isAdmin ? (
                <>
                  {/* Admin Menu */}
                  <NavLink
                    to="/dashboard/cart"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-black text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaShoppingBag className="w-5 h-5" />
                    <span>My Cart ({cart.length})</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-black text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Manage Users</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-products"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-black text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaShoppingBag className="w-5 h-5" />
                    <span>Manage Products</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-orders"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-black text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaListAlt className="w-5 h-5" />
                    <span>Manage Orders</span>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* Normal User Menu */}
                  <NavLink
                    to="/dashboard/cart"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-black text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaShoppingBag className="w-5 h-5" />
                    <span>My Cart ({cart.length})</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-white text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaListAlt className="w-5 h-5" />
                    <span>My Orders</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/wishlist"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-white text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaHeart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                        isActive ? "bg-white text-orange-600 shadow-md" : ""
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Profile</span>
                  </NavLink>
                </>
              )}
            </nav>

            {/* Divider */}
            <div className="border-t border-orange-400/30 my-6"></div>

            {/* Main Site Navigation */}
            <nav className="space-y-2">
              <NavLink
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaHome className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/shop"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaStore className="w-5 h-5" />
                <span>Shop</span>
              </NavLink>
              <NavLink
                to="/about"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaInfoCircle className="w-5 h-5" />
                <span>About</span>
              </NavLink>
              <NavLink
                to="/contact"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaEnvelope className="w-5 h-5" />
                <span>Contact</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 hidden sm:block">
                {user?.displayName}
              </span>
              <img
                className="w-6 h-6 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>
          </header>
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center p-2 z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 ${
              isActive ? "text-orange-600" : ""
            }`
          }
        >
          <FaHome className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 ${
              isActive ? "text-orange-600" : ""
            }`
          }
        >
          <FaStore className="w-6 h-6" />
          <span className="text-xs">Shop</span>
        </NavLink>
        <NavLink
          to="/dashboard/cart"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 ${
              isActive ? "text-orange-600" : ""
            }`
          }
        >
          <FaShoppingBag className="w-6 h-6" />
          <span className="text-xs">Cart</span>
        </NavLink>
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
          <span className="text-xs">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
