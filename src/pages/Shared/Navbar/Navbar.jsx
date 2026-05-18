import { useState, useContext, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  Loader2,
  Home,
  Store,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useWishlist from "../../../hooks/useWishlist";

// ✅ Categories dynamically linked to backend
const categories = [
  { name: "Audio", path: "/products/category/Audio" },
  { name: "Wearables", path: "/products/category/Wearables" },
  { name: "Mobile", path: "/products/category/Mobile" },
  { name: "Camera", path: "/products/category/Camera" },
  { name: "Drone", path: "/products/category/Drone" },
  { name: "Computing", path: "/products/category/Computing" },
  { name: "Accessories", path: "/products/category/Accessories" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const { wishlist, isLoading: isWishlistLoading } = useWishlist();
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const timeoutRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logOut().catch((error) => console.log(error));
  };

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || import.meta.env.VITE_SERVER_URL || "https://techzy-server.vercel.app"
          }/products/search?query=${encodeURIComponent(searchQuery)}`
        );

        // Check if response is OK
        if (!response.ok) {
          console.error("Search failed:", response.status, response.statusText);
          setSearchResults([]);
          setShowSearchResults(false);
          return;
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Response is not JSON:", contentType);
          setSearchResults([]);
          setShowSearchResults(false);
          return;
        }

        const data = await response.json();
        setSearchResults(data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setShowSearchResults(false);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Close search results and profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
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

      {/* Main Navbar */}
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

          {/* Search Bar with Results Dropdown */}
          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchResults.length > 0 && setShowSearchResults(true)
                }
                placeholder="Search for gadgets, phones, laptops..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {isSearching ? (
                <Loader2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 animate-spin" />
              ) : (
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              )}

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 border border-gray-200">
                  {searchResults.map((product) => (
                    <div
                      key={product._id?.$oid || product._id}
                      onClick={() =>
                        handleProductClick(product._id?.$oid || product._id)
                      }
                      className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b last:border-b-0 transition"
                    >
                      <img
                        src={
                          product.image?.[0] ||
                          product.image ||
                          product.images?.[0] ||
                          "https://via.placeholder.com/48"
                        }
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/48";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-orange-600">
                          ৳{product.price?.$numberInt || product.price}
                        </p>
                      </div>
                    </div>
                  ))}

                  {searchResults.length === 20 && (
                    <div className="p-3 text-center border-t">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View all results →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* No Results Message */}
              {showSearchResults &&
                searchQuery.trim().length >= 2 &&
                searchResults.length === 0 &&
                !isSearching && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      No products found for "{searchQuery}"
                    </p>
                  </div>
                )}
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 transition duration-200"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="text-gray-700 hover:text-orange-600 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-600 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            {/* Wishlist */}
            {!isAdmin && (
              <Link to={user ? "/dashboard/wishlist" : "/login"} className="hidden md:block">
                <button className="relative p-2 text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
                  <Heart size={20} />
                  {!isWishlistLoading && wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </Link>
            )}

            {/* Shopping Cart / Admin */}
            {isAdmin ? (
              <Link to="/dashboard/manage-users" className="hidden md:block">
                <button className="relative p-2 text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
                  Admin Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/cart" className="hidden md:block">
                <button className="relative p-2 text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </Link>
            )}

            {/* User Profile / Login (Industry Standard Mobile/Desktop Responsive) */}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4 pl-2 relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/GvFrhKg6/user.png"}
                    alt="profile"
                    title={user.displayName || "User"}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-250 cursor-pointer object-cover hover:border-orange-500 transition-colors"
                  />
                </button>

                {/* Premium Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logged in as</p>
                      <p className="text-sm font-extrabold text-gray-800 truncate">
                        {user.displayName || "User"}
                      </p>
                    </div>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-semibold transition"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
                
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer hidden md:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                {/* Desktop Login Button */}
                <Link to="/login" className="hidden md:block">
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-2 py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer">
                    Login
                  </button>
                </Link>
                {/* Mobile Login Icon (Lucide User Icon) */}
                <Link to="/login" className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
                  <User className="w-6 h-6" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Categories with Collapse Toggle */}
            <div className="border-b border-gray-100 pb-3">
              <button
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="w-full flex items-center justify-between text-gray-700 font-bold hover:text-orange-500 focus:outline-none transition cursor-pointer"
              >
                <span>Categories</span>
                <span className="transform transition-transform duration-200 text-lg font-bold">
                  {isMobileCategoriesOpen ? "−" : "+"}
                </span>
              </button>
              
              {isMobileCategoriesOpen && (
                <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-orange-400 animate-in slide-in-from-top-1 duration-200">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="block px-2 py-1 text-sm text-gray-600 hover:text-orange-500 rounded-md transition font-semibold"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileCategoriesOpen(false);
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/shop"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Auth buttons */}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center p-2 z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 ${
              isActive ? "text-orange-600" : ""
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-semibold">Home</span>
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
          <span className="text-xs font-semibold">Shop</span>
        </NavLink>
        <NavLink
          to="/dashboard/cart"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 relative ${
              isActive ? "text-orange-600" : ""
            }`
          }
        >
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute top-1 right-2 bg-orange-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
          <span className="text-xs font-semibold">Cart</span>
        </NavLink>
        <button
          onClick={toggleMenu}
          className={`flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 cursor-pointer ${
            isMenuOpen ? "text-orange-600" : ""
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <span className="text-xs font-semibold">Menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
