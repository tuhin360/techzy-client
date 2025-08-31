import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  Phone,
  Mail,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 max-w-7xl mx-auto">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Tech<span className="text-orange-500">Zy</span>
            </h1>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
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
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition duration-200">
                Categories
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Smartphones
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Laptops
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Headphones
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Gaming
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Accessories
                  </a>
                </div>
              </div>
            </div>
            <a
              href="/deals"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Deals
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Contact
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition duration-200">
              <Heart size={20} />
            </button>
            {/* User account */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition duration-200">
              <User size={20} />
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
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <a
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </a>
            <div className="border-l-2 border-gray-200 pl-4">
              <p className="font-semibold text-gray-800 mb-2">Categories</p>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 py-1"
              >
                Smartphones
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 py-1"
              >
                Laptops
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 py-1"
              >
                Headphones
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 py-1"
              >
                Gaming
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-blue-600 py-1"
              >
                Accessories
              </a>
            </div>
            <a
              href="/deals"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Deals
            </a>
            <a
              href="/about"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Contact
            </a>
            <div className="border-t pt-3 mt-3">
              <a
                href="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition duration-200"
              >
                Login / Register
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
