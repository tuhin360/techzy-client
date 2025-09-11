import { useState, memo, Suspense, useEffect, useCallback } from "react";
import {
  FaStore,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaListAlt,
  FaRegListAlt,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { ToyBrick } from "lucide-react";

// Static menu configurations for zero computation time
const ADMIN_MENU = [
  { to: "/dashboard/manage-users", icon: FaUser, label: "Manage Users" },
  { to: "/dashboard/add-product", icon: ToyBrick, label: "Add Product" },
  { to: "/dashboard/manage-products", icon: FaShoppingBag, label: "Manage Products" },
  { to: "/dashboard/manage-orders", icon: FaListAlt, label: "Manage Orders" },
];

const USER_MENU = [
  { to: "/dashboard/cart", icon: FaShoppingBag, label: "My Cart" },
  { to: "/dashboard/orders", icon: FaListAlt, label: "My Orders" },
  { to: "/dashboard/wishlist", icon: FaHeart, label: "Wishlist" },
  { to: "/dashboard/profile", icon: FaUser, label: "Profile" },
  { to: "/dashboard/payment-history", icon: FaRegListAlt, label: "Payment History" },
];

const MAIN_NAV = [
  { to: "/", icon: FaHome, label: "Home" },
  { to: "/shop", icon: FaStore, label: "Shop" },
  { to: "/about", icon: FaInfoCircle, label: "About" },
  { to: "/contact", icon: FaEnvelope, label: "Contact" },
];

const BOTTOM_NAV = [
  { to: "/", icon: FaHome, label: "Home" },
  { to: "/shop", icon: FaStore, label: "Shop" },
  { to: "/dashboard/cart", icon: FaShoppingBag, label: "Cart" },
];

// Lightning-fast NavLink component with pre-computed classes
const FastNavLink = memo(({ to, icon: Icon, label, onClick, isActive }) => (
  <NavLink
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
      isActive ? "bg-black text-orange-600 shadow-md" : ""
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span>{label}</span>
  </NavLink>
));

// Instant-render sidebar with dual menu approach
const Sidebar = memo(({ isSidebarOpen, setIsSidebarOpen, isAdmin, cartLength }) => {
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [setIsSidebarOpen]);

  return (
    <aside
      className={`fixed top-0 right-0 z-40 w-64 sm:w-72 h-full bg-gradient-to-b from-orange-600 to-orange-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } lg:sticky lg:top-0 lg:translate-x-0 lg:w-72 lg:min-h-screen lg:bg-opacity-90 lg:backdrop-blur-md`}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8 flex items-center space-x-2">
          <Link to="/" onClick={closeSidebar}>
            <h1 className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-200 hover:scale-105">
              Tech<span className="text-yellow-300">Zy</span>
            </h1>
          </Link>
        </div>

        {/* Dashboard Navigation - Render both menus, toggle visibility */}
        <nav className="space-y-2">
          {/* Admin Menu */}
          <div className={isAdmin ? 'block' : 'hidden'}>
            {ADMIN_MENU.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                    isActive ? "bg-black text-orange-600 shadow-md" : ""
                  }`
                }
                onClick={closeSidebar}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* User Menu */}
          <div className={!isAdmin ? 'block' : 'hidden'}>
            {USER_MENU.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
                    isActive ? "bg-black text-orange-600 shadow-md" : ""
                  }`
                }
                onClick={closeSidebar}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>
                  {to === "/dashboard/cart" ? `${label} (${cartLength})` : label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Divider */}
        <div className="border-t border-orange-400/30 my-6"></div>

        {/* Main Site Navigation */}
        <nav className="space-y-2">
          {MAIN_NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
              onClick={closeSidebar}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
});

// Minimal header with instant rendering
const Header = memo(({ user }) => (
  <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-600 hidden sm:block">
        {user?.displayName || "User"}
      </span>
      {user?.photoURL && (
        <img
          className="w-6 h-6 rounded-full"
          src={user.photoURL}
          alt=""
          loading="lazy"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
    </div>
  </header>
));

// Streamlined mobile navigation
const MobileNav = memo(({ toggleSidebar, isSidebarOpen }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center p-2 z-50">
    {BOTTOM_NAV.map(({ to, icon: Icon, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 ${
            isActive ? "text-orange-600" : ""
          }`
        }
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs">{label}</span>
      </NavLink>
    ))}
    
    <button
      onClick={toggleSidebar}
      className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
      aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
    >
      {isSidebarOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
      <span className="text-xs">Menu</span>
    </button>
  </div>
));

// Main Dashboard with aggressive performance optimizations
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  // Non-blocking data fetching
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();
  
  // Local state for instant UI updates with defaults
  const [localAdmin, setLocalAdmin] = useState(() => {
    // Try to get from localStorage immediately
    const saved = localStorage.getItem('userRole');
    return saved === 'admin';
  });
  
  const [cartLength, setCartLength] = useState(0);

  // Update local state when real data arrives
  useEffect(() => {
    if (!isAdminLoading) {
      setLocalAdmin(isAdmin);
      localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
    }
  }, [isAdmin, isAdminLoading]);

  useEffect(() => {
    setCartLength(cart?.length || 0);
  }, [cart?.length]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ease-in-out"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Main Container */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar - Renders instantly */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isAdmin={localAdmin}
          cartLength={cartLength}
        />

        {/* Main Content */}
        <main className="flex-1 w-full h-screen overflow-auto">
          <Header user={user} />
          
          <div className="p-4 sm:p-6 lg:p-8">
            <Suspense 
              fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

// Set display names
Sidebar.displayName = "Sidebar";
Header.displayName = "Header";
MobileNav.displayName = "MobileNav";
FastNavLink.displayName = "FastNavLink";

export default Dashboard;