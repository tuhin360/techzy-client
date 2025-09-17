import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaEye,
  FaEdit,
  FaFilter,
  FaSearch,
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
  FaChartLine
} from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import {
  MdCancel,
  MdLocalShipping,
  MdPayment,
  MdExpandMore,
  MdDateRange,
  MdEmail,
  MdAttachMoney,
  MdInventory
} from "react-icons/md";
import { BsGrid3X3Gap, BsTable } from "react-icons/bs";
import { BiSolidShoppingBags } from "react-icons/bi";
import { RiRefund2Fill, RiCustomerService2Fill } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Package, Calendar, User, CreditCard, BarChart3 } from "lucide-react";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Create a ref for the search input
  const searchInputRef = useRef(null);

  const {
    data: ordersData = { payments: [], pagination: {} },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", filterStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.append("status", filterStatus);

      const res = await axiosSecure.get(`/payments?${params.toString()}`);
      return res.data.payments
        ? res.data
        : { payments: res.data, pagination: {} };
    },
  });

  const orders = ordersData.payments || ordersData || [];

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle search input focus management
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  // Clear search with focus retention
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin shadow-lg"></div>
        <p className="text-gray-600 font-medium">Loading orders...</p>
      </div>
    );
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.put(`/payments/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Success!",
          `Order status updated to ${newStatus}!`,
          "success"
        );
        refetch();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  const handleDeleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/payments/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.error("Error deleting order:", err);
        const errorMsg = err.response?.data?.error || "Failed to delete order";
        Swal.fire("Error", errorMsg, "error");
      }
    }
  };

  const handleViewOrder = (order) => {
    const totalItems = order.cartItems?.length || 0;
    const menuItemsDisplay =
      order.menuItems
        ?.slice(0, 3)
        .map((item) => item.name || item.title)
        .join(", ") || "N/A";
    const hasMoreItems = order.menuItems?.length > 3;

    Swal.fire({
      title: "Order Details",
      html: `
        <div class="text-left space-y-3">
          <div class="bg-gray-50 p-3 rounded">
            <p><strong>🆔 Order ID:</strong> #${order._id
              .slice(-8)
              .toUpperCase()}</p>
            <p><strong>📧 Customer Email:</strong> ${order.email}</p>
            <p><strong>💰 Total Amount:</strong> $${order.amount || "0.00"}</p>
            <p><strong>💳 Transaction ID:</strong> ${
              order.transactionId || "N/A"
            }</p>
          </div>
          
          <div class="bg-blue-50 p-3 rounded">
            <p><strong>📅 Order Date:</strong> ${new Date(
              order.date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
            <p><strong>📦 Status:</strong> <span class="capitalize font-semibold text-blue-600">${
              order.status
            }</span></p>
            <p><strong>🛍️ Total Items:</strong> ${totalItems}</p>
          </div>
          
          <div class="bg-green-50 p-3 rounded">
            <p><strong>🍽️ Items:</strong></p>
            <p class="text-sm text-gray-600 mt-1">${menuItemsDisplay}${
        hasMoreItems ? ` (+${order.menuItems.length - 3} more)` : ""
      }</p>
          </div>
          
          <div class="bg-yellow-50 p-3 rounded">
            <p><strong>🕒 Last Updated:</strong> ${
              order.updatedAt
                ? new Date(order.updatedAt).toLocaleDateString()
                : "N/A"
            }</p>
            <p><strong>🕒 Created:</strong> ${
              order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : new Date(order.date).toLocaleDateString()
            }</p>
          </div>
        </div>
      `,
      width: 600,
      confirmButtonText: "Close",
      confirmButtonColor: "#3B82F6",
    });
  };

  // Enhanced filter function with better transaction ID search
  const filteredOrders = orders.filter((order) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Search in multiple fields with null checks
    const emailMatch = order.email?.toLowerCase().includes(searchLower) || false;
    const idMatch = order._id?.toLowerCase().includes(searchLower) || false;
    const transactionMatch = order.transactionId?.toLowerCase().includes(searchLower) || false;
    const nameMatch = order.name?.toLowerCase().includes(searchLower) || false;
    
    // Also search in partial transaction ID (last 8 characters)
    const partialTransactionMatch = order.transactionId?.slice(-8).toLowerCase().includes(searchLower) || false;
    
    // Debug log to help identify issues (remove in production)
    // if (searchTerm && order.transactionId) {
    //   console.log(`Searching "${searchTerm}" in transaction "${order.transactionId}": ${transactionMatch || partialTransactionMatch}`);
    // }
    
    return emailMatch || idMatch || transactionMatch || nameMatch || partialTransactionMatch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        text: "🔄 Pending",
        icon: <MdCancel className="w-3 h-3 mr-1" />
      },
      confirmed: {
        color: "bg-blue-100 text-blue-800 border-blue-300",
        text: "✅ Confirmed",
        icon: <TiTick className="w-3 h-3 mr-1" />
      },
      processing: {
        color: "bg-purple-100 text-purple-800 border-purple-300",
        text: "⚙️ Processing",
        icon: <FaEdit className="w-3 h-3 mr-1" />
      },
      shipped: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-300",
        text: "🚚 Shipped",
        icon: <MdLocalShipping className="w-3 h-3 mr-1" />
      },
      delivered: {
        color: "bg-green-100 text-green-800 border-green-300",
        text: "📦 Delivered",
        icon: <TiTick className="w-3 h-3 mr-1" />
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-300",
        text: "❌ Cancelled",
        icon: <MdCancel className="w-3 h-3 mr-1" />
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color} whitespace-nowrap flex items-center`}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getStatusActions = (order) => {
    const { status, _id } = order;

    const actionButtons = {
      pending: [
        {
          action: () => handleStatusUpdate(_id, "confirmed"),
          color: "bg-blue-500 hover:bg-blue-600",
          icon: <TiTick className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Confirm Order",
          label: "Confirm",
        },
        {
          action: () => handleStatusUpdate(_id, "cancelled"),
          color: "bg-red-500 hover:bg-red-600",
          icon: <MdCancel className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Cancel Order",
          label: "Cancel",
        },
      ],
      confirmed: [
        {
          action: () => handleStatusUpdate(_id, "processing"),
          color: "bg-purple-500 hover:bg-purple-600",
          icon: <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Start Processing",
          label: "Process",
        },
      ],
      processing: [
        {
          action: () => handleStatusUpdate(_id, "shipped"),
          color: "bg-indigo-500 hover:bg-indigo-600",
          icon: <MdLocalShipping className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Mark as Shipped",
          label: "Ship",
        },
      ],
      shipped: [
        {
          action: () => handleStatusUpdate(_id, "delivered"),
          color: "bg-green-500 hover:bg-green-600",
          icon: <TiTick className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Mark as Delivered",
          label: "Deliver",
        },
      ],
      delivered: [
        {
          action: null,
          color: "bg-green-700 opacity-80 cursor-not-allowed",
          icon: <TiTick className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Order Completed",
          label: "Complete",
        },
      ],
      cancelled: [
        {
          action: null,
          color: "bg-gray-500 opacity-80 cursor-not-allowed",
          icon: <MdCancel className="w-3 h-3 sm:w-4 sm:h-4" />,
          title: "Order Cancelled",
          label: "Cancelled",
        },
      ],
    };

    const buttons = actionButtons[status] || [];

    return (
      <div className="flex flex-wrap gap-1">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`flex items-center justify-center px-2 py-1 ${button.color} text-white rounded-md transition-all duration-300 hover:scale-105 shadow-sm text-xs font-medium`}
            title={button.title}
            disabled={!button.action}
          >
            <span className="mr-1">{button.icon}</span>
            <span className="hidden sm:inline">{button.label}</span>
          </button>
        ))}
      </div>
    );
  };

  const canDeleteOrder = (status) => {
    return ["pending", "confirmed", "cancelled"].includes(status);
  };

  // Mobile Card Component
  const OrderCard = ({ order, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">
            #{index + 1}
          </span>
          <span className="font-mono text-sm text-gray-600">
            #{order._id.slice(-6).toUpperCase()}
          </span>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* Customer Info */}
      <div className="border-l-4 border-blue-500 pl-3">
        <div className="font-medium text-gray-900 text-sm flex items-center">
          <MdEmail className="w-4 h-4 mr-1 text-blue-500" />
          {order.email.split("@")[0]}
        </div>
        <div className="text-xs text-gray-500 ml-5">{order.email}</div>
        {order.transactionId && (
          <div className="text-xs text-gray-400 font-mono mt-1 ml-5">
            <CreditCard className="w-3 h-3 inline mr-1" />
            TX: {order.transactionId.slice(-8)}
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide flex items-center">
            <MdDateRange className="w-3 h-3 mr-1" />
            Date
          </div>
          <div className="font-medium">
            {new Date(order.date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(order.date).toLocaleTimeString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide flex items-center">
            <MdAttachMoney className="w-3 h-3 mr-1" />
            Amount
          </div>
          <div className="font-bold text-green-600 text-lg">
            ৳{order.amount || "0.00"}
          </div>
        </div>
      </div>

      {/* Items Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <MdInventory className="w-4 h-4 text-purple-500" />
          <span className="text-gray-600">
            {order.cartItems?.length || 0} items
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewOrder(order)}
            className="flex items-center justify-center px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-all duration-300 hover:scale-105 shadow-sm text-xs"
            title="View Order Details"
          >
            <FaEye className="w-3 h-3 mr-1" />
            <span>View Details</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {getStatusActions(order)}
          {canDeleteOrder(order.status) && (
            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="flex items-center justify-center px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-300 hover:scale-105 shadow-sm text-xs"
              title="Delete Order"
            >
              <FaTrash className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 shadow-sm border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage Orders
              </h1>
              <p className="text-gray-600">
                Manage and track your orders.
              </p>
            </div>
          </div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <BiSolidShoppingBags className="w-5 h-5 mr-2 text-orange-600" />
                Total Orders ({filteredOrders.length})
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-lg shadow-md transition-all hover:scale-105"
                >
                  <FaFilter className="w-4 h-4" />
                </button>
                <div className="hidden lg:flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <FaMoneyBillWave className="w-4 h-4" />
                  Total Revenue:
                  <span className="font-semibold ml-2">
                    ৳
                    {filteredOrders
                      .reduce((sum, order) => sum + (order.amount || 0), 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Revenue Display */}
            <div className="lg:hidden mb-4 flex items-center justify-center space-x-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
              <FaMoneyBillWave className="w-5 h-5" />
              <div className="text-center">
                <div className="font-bold text-lg">
                  ৳
                  {filteredOrders
                    .reduce((sum, order) => sum + (order.amount || 0), 0)
                    .toFixed(2)}
                </div>
                <div className="text-xs text-green-700">Total Revenue</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div
              className={`space-y-4 transition-all duration-300 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
                {/* Search Input with improved focus handling */}
                <div className="relative flex-1">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${isSearchFocused ? 'text-purple-500' : 'text-gray-400'}`}>
                    <FaSearch className="w-4 h-4" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by email, order ID, or transaction ID..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 ${
                      isSearchFocused 
                        ? "border-purple-500 ring-2 ring-purple-200" 
                        : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    }`}
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MdCancel className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaFilter className="w-4 h-4" />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                    <MdExpandMore className="w-5 h-5" />
                  </div>
                </div>

                {/* View Mode Toggle for Desktop */}
                <div className="hidden lg:flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      viewMode === "cards"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <BsGrid3X3Gap className="w-4 h-4 mr-1" />
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      viewMode === "table"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <BsTable className="w-4 h-4 mr-1" />
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4">
            {filteredOrders.map((order, index) => (
              <OrderCard key={order._id} order={order} index={index} />
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            {viewMode === "table" ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#D99904] to-[#B8860B] text-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Items
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Actions
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOrders.map((order, index) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-bold">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <MdPayment className="w-4 h-4 text-blue-500" />
                              <span className="font-mono text-sm">
                                #{order._id.slice(-6).toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900 text-sm flex items-center">
                                <MdEmail className="w-4 h-4 mr-1 text-blue-500" />
                                {order.email.split("@")[0]}
                              </div>
                              <div className="text-xs text-gray-500 ml-5">
                                {order.email}
                              </div>
                              {order.transactionId && (
                                <div className="text-xs text-gray-400 font-mono ml-5">
                                  <CreditCard className="w-3 h-3 inline mr-1" />
                                  TX: {order.transactionId.slice(-8)}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(order.date).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(order.date).toLocaleTimeString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-bold text-green-600 flex items-center">
                              <MdAttachMoney className="w-5 h-5 mr-1" />
                              ৳{order.amount || "0.00"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <MdInventory className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-medium">
                                {order.cartItems?.length || 0} items
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleViewOrder(order)}
                              className="flex items-center justify-center w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                              title="View Order Details"
                            >
                              <FaEye className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {getStatusActions(order)}
                              {canDeleteOrder(order.status) && (
                                <button
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                                  title="Delete Order"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredOrders.map((order, index) => (
                  <OrderCard key={order._id} order={order} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-500 text-center px-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Orders will appear here once customers start placing them."}
              </p>
              {searchTerm && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Searching for: "<span className="font-mono bg-gray-100 px-2 py-1 rounded">{searchTerm}</span>"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-purple-600 hover:text-purple-800 underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Order Statistics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { status: "pending", icon: <RiCustomerService2Fill className="w-5 h-5" /> },
              { status: "confirmed", icon: <TiTick className="w-5 h-5" /> },
              { status: "processing", icon: <FaEdit className="w-4 h-4" /> },
              { status: "shipped", icon: <MdLocalShipping className="w-5 h-5" /> },
              { status: "delivered", icon: <FaBoxOpen className="w-5 h-5" /> },
              { status: "cancelled", icon: <RiRefund2Fill className="w-5 h-5" /> },
            ].map(({ status, icon }) => {
              const count = orders.filter(
                (order) => order.status === status
              ).length;
              const percentage =
                orders.length > 0
                  ? ((count / orders.length) * 100).toFixed(1)
                  : 0;
              const totalAmount = orders
                .filter((order) => order.status === status)
                .reduce((sum, order) => sum + (order.amount || 0), 0);

              return (
                <div
                  key={status}
                  className="bg-white p-4 rounded-lg text-center border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-2 text-gray-600">
                    {icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600 capitalize font-medium">
                    {status}
                  </div>
                  <div className="text-xs text-gray-500">{percentage}%</div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ৳{totalAmount.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats Summary */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Order Summary
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                  <FaShoppingCart className="w-5 h-5 mr-1" />
                  {orders.length}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                  <FaMoneyBillWave className="w-5 h-5 mr-1" />
                  ৳
                  {orders
                    .reduce((sum, order) => sum + (order.amount || 0), 0)
                    .toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                  <MdInventory className="w-5 h-5 mr-1" />
                  {orders.reduce(
                    (sum, order) => sum + (order.cartItems?.length || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                  <FaChartLine className="w-5 h-5 mr-1" />
                  ৳
                  {orders.length > 0
                    ? (
                        orders.reduce(
                          (sum, order) => sum + (order.amount || 0),
                          0
                        ) / orders.length
                      ).toFixed(2)
                    : "0.00"}
                </div>
                <div className="text-sm text-gray-600">Avg Order Value</div>
              </div>
            </div>
          </div>

          {/* Pagination Info */}
          {ordersData.pagination && ordersData.pagination.totalCount > 0 && (
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Showing {(ordersData.pagination.currentPage - 1) * 50 + 1} to{" "}
                  {Math.min(
                    ordersData.pagination.currentPage * 50,
                    ordersData.pagination.totalCount
                  )}{" "}
                  of {ordersData.pagination.totalCount} orders
                </div>
                <div className="text-sm text-gray-600">
                  Page {ordersData.pagination.currentPage} of{" "}
                  {ordersData.pagination.totalPages}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;