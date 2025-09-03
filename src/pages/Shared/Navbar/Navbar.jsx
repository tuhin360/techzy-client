import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Link import
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 ">
      {/* Top bar with contact info */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>info@techzy.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free shipping on orders over ৳5000!</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold text-black">
                Tech<span className="text-orange-500">Zy</span>
              </h1>
            </Link>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-1/3 mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for gadgets, phones, laptops..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition duration-200">
                Categories
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    to="/category/smartphones"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Smartphones
                  </Link>
                  <Link
                    to="/category/laptops"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Laptops
                  </Link>
                  <Link
                    to="/category/headphones"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Headphones
                  </Link>
                  <Link
                    to="/category/gaming"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Gaming
                  </Link>
                  <Link
                    to="/category/accessories"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Accessories
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/secret"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Secret
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <button className=" text-gray-700 hover:text-blue-600 transition duration-200">
              <Heart size={20} />
            </button>

            {/* Shopping cart */}
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition duration-200">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User profile */}
            {user ? (
              <div className="flex items-center gap-4 pl-2 ">
                {/* Profile Image */}
                <img
                  src={
                    user.photoURL || "https://i.ibb.co.com/GvFrhKg6/user.png"
                  }
                  alt="profile"
                  title={user.displayName || "User"} // Hover tooltip
                  className="w-10 h-10 rounded-full border cursor-pointer hidden md:block"
                />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer hidden md:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-2  py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer hidden md:block">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-3 border-t">
          <div className="relative">
            <input
              type="text"
              placeholder="Search gadgets..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg h-screen overflow-y-auto">
          <div className="px-4 py-3 space-y-3">
            {/* Main Links */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>

            {/* Categories */}
            <div className="border-l-2 border-gray-200 pl-4">
              <button
                onClick={toggleCategories}
                className="w-full flex justify-between items-center font-semibold text-gray-800 mb-2 focus:outline-none"
              >
                Categories
                <ChevronRight
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="space-y-1 pl-2">
                  <Link
                    to="/category/smartphones"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Smartphones
                  </Link>
                  <Link
                    to="/category/laptops"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Laptops
                  </Link>
                  <Link
                    to="/category/headphones"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Headphones
                  </Link>
                  <Link
                    to="/category/gaming"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Gaming
                  </Link>
                  <Link
                    to="/category/accessories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Accessories
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Contact
            </Link>

            {/* User Section */}
            <div className="border-t pt-3 mt-3">
              {user ? (
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
                  {/* Profile Image */}
                  <img
                    src={user.photoURL || "https://i.ibb.co/GvFrhKg6/user.png"}
                    alt="profile"
                    className="w-14 h-14 rounded-full border flex-shrink-0"
                  />

                  {/* User Name */}
                  <span className="font-medium text-gray-700 text-center">
                    {user.displayName || "User"}
                  </span>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false); // close menu on logout
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
