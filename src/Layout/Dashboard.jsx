import { useState, memo, Suspense, lazy } from "react";
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
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { ToyBrick } from "lucide-react";

// Lazy load the skeleton component
const DashboardSkeleton = lazy(() => import('../components/DashboardSkeleton'));

// Memoized Sidebar Component
const Sidebar = memo(({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  isAdmin, 
  isAdminLoading, 
  cartLength 
}) => {
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div
      className={`fixed top-0 right-0 z-40 w-64 sm:w-72 h-full bg-gradient-to-b from-orange-600 to-orange-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } lg:sticky lg:top-0 lg:translate-x-0 lg:w-72 lg:min-h-screen lg:bg-opacity-90 lg:backdrop-blur-md`}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8 flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-3xl font-extrabold text-white tracking-tight transition-transform duration-200 hover:scale-105">
              Tech<span className="text-yellow-300">Zy</span>
            </h1>
          </Link>
        </div>

        {/* Dashboard Navigation */}
        <nav className="space-y-2">
          {/* Show loading state while checking admin status */}
          {isAdminLoading ? 
            DashboardSkeleton
          : isAdmin ? (
            <AdminMenu closeSidebar={closeSidebar} />
          ) : (
            <UserMenu closeSidebar={closeSidebar} cartLength={cartLength} />
          )}
        </nav>

        {/* Divider */}
        <div className="border-t border-orange-400/30 my-6"></div>

        {/* Main Site Navigation */}
        <MainNavigation closeSidebar={closeSidebar} />
      </div>
    </div>
  );
});

// Memoized Admin Menu
const AdminMenu = memo(({ closeSidebar }) => (
  <>
    <NavLink
      to="/dashboard/manage-users"
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
          isActive ? "bg-black text-orange-600 shadow-md" : ""
        }`
      }
      onClick={closeSidebar}
    >
      <FaUser className="w-5 h-5" />
      <span>Manage Users</span>
    </NavLink>

    <NavLink
      to="/dashboard/add-product"
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
          isActive ? "bg-black text-orange-600 shadow-md" : ""
        }`
      }
      onClick={closeSidebar}
    >
      <ToyBrick className="w-5 h-5" />
      <span>Add Product</span>
    </NavLink>

    <NavLink
      to="/dashboard/manage-products"
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
          isActive ? "bg-black text-orange-600 shadow-md" : ""
        }`
      }
      onClick={closeSidebar}
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
      onClick={closeSidebar}
    >
      <FaListAlt className="w-5 h-5" />
      <span>Manage Orders</span>
    </NavLink>
  </>
));

// Memoized User Menu
const UserMenu = memo(({ closeSidebar, cartLength }) => (
  <>
    <NavLink
      to="/dashboard/cart"
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
          isActive ? "bg-black text-orange-600 shadow-md" : ""
        }`
      }
      onClick={closeSidebar}
    >
      <FaShoppingBag className="w-5 h-5" />
      <span>My Cart ({cartLength})</span>
    </NavLink>

    <NavLink
      to="/dashboard/orders"
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 ${
          isActive ? "bg-white text-orange-600 shadow-md" : ""
        }`
      }
      onClick={closeSidebar}
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
      onClick={closeSidebar}
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
      onClick={closeSidebar}
    >
      <FaUser className="w-5 h-5" />
      <span>Profile</span>
    </NavLink>
  </>
));

// Memoized Main Navigation
const MainNavigation = memo(({ closeSidebar }) => (
  <nav className="space-y-2">
    <NavLink
      to="/"
      className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
      onClick={closeSidebar}
    >
      <FaHome className="w-5 h-5" />
      <span>Home</span>
    </NavLink>
    <NavLink
      to="/shop"
      className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
      onClick={closeSidebar}
    >
      <FaStore className="w-5 h-5" />
      <span>Shop</span>
    </NavLink>
    <NavLink
      to="/about"
      className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
      onClick={closeSidebar}
    >
      <FaInfoCircle className="w-5 h-5" />
      <span>About</span>
    </NavLink>
    <NavLink
      to="/contact"
      className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/20 hover:scale-105 transition-all duration-200"
      onClick={closeSidebar}
    >
      <FaEnvelope className="w-5 h-5" />
      <span>Contact</span>
    </NavLink>
  </nav>
));

// Memoized Header
const Header = memo(({ user }) => (
  <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-600 hidden sm:block">
        {user?.displayName || 'Loading...'}
      </span>
      {user?.photoURL && (
        <img
          className="w-6 h-6 rounded-full"
          src={user.photoURL}
          alt="Profile"
          loading="lazy"
        />
      )}
    </div>
  </header>
));

// Main Dashboard Component
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cart] = useCart();
  const { user } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

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
        />
      )}

      {/* Main Dashboard Container */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar - Now renders immediately with loading states */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isAdmin={isAdmin}
          isAdminLoading={isAdminLoading}
          cartLength={cart?.length || 0}
        />

        {/* Main Content */}
        <div className="flex-1 w-full h-screen overflow-auto">
          <Header user={user} />
          
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Use Suspense for lazy-loaded components */}
            <Suspense fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Memoized */}
      <MobileBottomNavigation 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
      />
    </div>
  );
};

// Memoized Mobile Bottom Navigation
const MobileBottomNavigation = memo(({ toggleSidebar, isSidebarOpen }) => (
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
));

// Set display names for debugging
Sidebar.displayName = 'Sidebar';
AdminMenu.displayName = 'AdminMenu';
UserMenu.displayName = 'UserMenu';
MainNavigation.displayName = 'MainNavigation';
Header.displayName = 'Header';
MobileBottomNavigation.displayName = 'MobileBottomNavigation';

export default Dashboard;