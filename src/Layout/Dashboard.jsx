import { useState } from "react";
import {
  Store,
  Info,
  Mail,
  Home,
  Menu,
  X,
  ShoppingBag,
  User,
} from "lucide-react";
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
        {/* Sidebar (Mobile/Tablet: Toggleable, Desktop: Sticky) */}
        <div
          className={`fixed top-0 left-0 z-40 w-64 sm:w-72 h-full bg-gradient-to-b from-orange-600 to-orange-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:sticky lg:top-0 lg:translate-x-0 lg:w-72 lg:min-h-screen lg:bg-opacity-90 lg:backdrop-blur-md`}
        >
          <div className="p-6">
            {/* Logo */}
            <div className="mb-8 flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-200 hover:scale-105">
                Tech<span className="text-yellow-300">zy</span>
              </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <NavLink
                to="/dashboard/cart"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                    isActive ? "bg-black text-orange-600 shadow-md" : ""
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </NavLink>
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
                <Home className="w-5 h-5" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/shop"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Store className="w-5 h-5" />
                <span>Shop</span>
              </NavLink>
              <NavLink
                to="/about"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Info className="w-5 h-5" />
                <span>About</span>
              </NavLink>
              <NavLink
                to="/contact"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Mail className="w-5 h-5" />
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
              ></img>
              {/* <User className="w-6 h-6 text-orange-600" /> */}
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
          <Home className="w-6 h-6" />
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
          <Store className="w-6 h-6" />
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
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Cart</span>
        </NavLink>
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <span className="text-xs">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
