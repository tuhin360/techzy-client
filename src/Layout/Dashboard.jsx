import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto flex min-h-screen bg-gray-50">
      {/* Dashboard Sidebar */}
      <div className="w-72 min-h-full bg-gradient-to-b from-orange-600 to-orange-700 shadow-xl">
        <div className="p-6">
          {/* Techzy Logo */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">
              Tech<span className="text-yellow-300">zy</span>
            </h1>
            <p className="text-orange-100 text-sm font-medium">Dashboard</p>
          </div>

          {/* Navigation Items with Icons */}
          <nav className="space-y-2 mb-6">
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:translate-x-1'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 2H1m6 18a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span>My Cart</span>
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:translate-x-1'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>My Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:translate-x-1'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Wishlist</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-white hover:bg-white/20 hover:translate-x-1'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </NavLink>
          </nav>

          {/* Divider */}
          <div className="border-t border-orange-500/30 my-6"></div>

          {/* Main Site Navigation */}
          <nav className="space-y-2">
            <NavLink
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/shop"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Shop</span>
            </NavLink>

            <NavLink
              to="/about"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About</span>
            </NavLink>

            <NavLink
              to="/contact"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-orange-100 hover:bg-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 bg-white">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;