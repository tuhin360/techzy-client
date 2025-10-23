import { useState } from "react";
import { Package, Edit, Trash2, DollarSign } from "lucide-react";
import Swal from "sweetalert2";
import useProducts from "../../../hooks/useProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { products, refetch } = useProducts();
  const axiosSecure = useAxiosSecure();

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleDeleteProduct = async (product) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete "${product.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${product._id}`);
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `"${product.title}" has been deleted successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: res.data.message || "Could not delete product.",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Something went wrong while deleting "${product.title}".`,
      });
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Products
            </h1>
            <p className="text-gray-600">
              Manage product inventory and information
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {products.length}
              </p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden pb-10">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Management
          </h2>
          <p className="text-sm text-gray-600">
            View and manage all products in inventory
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Product Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Product Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Edit
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {String(indexOfFirst + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={
                        product.image ||
                        `https://via.placeholder.com/60x60?text=${encodeURIComponent(
                          product.title?.charAt(0) || "P"
                        )}`
                      }
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {formatPrice(product.price || 0)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/dashboard/update-item/${product._id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {currentProducts.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  #{String(indexOfFirst + index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">
                    {formatPrice(product.price || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={
                    product.image ||
                    `https://via.placeholder.com/60x60?text=${encodeURIComponent(
                      product.title?.charAt(0) || "P"
                    )}`
                  }
                  alt={product.title}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-2">
                    {product.title || "Untitled Product"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                <Link to={`/dashboard/update-item/${product._id}`}>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 border border-blue-300 hover:bg-blue-50 rounded-lg transition">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Pagination */}
        {products.length > productsPerPage && (
          <div className="flex justify-center items-center mt-10 space-x-2 pb-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
