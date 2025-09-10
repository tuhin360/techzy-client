import { Package, Edit, Trash2, DollarSign } from "lucide-react";
import Swal from "sweetalert2";
import useProducts from "../../../hooks/useProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { products, refetch } = useProducts();
  const axiosSecure = useAxiosSecure();

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
        console.log("Delete response:", res.data);

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `"${product.title}" has been deleted successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
          // Refresh products after delete
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
      console.error(err);
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

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Management
          </h2>
          <p className="text-sm text-gray-600">
            View and manage all products in inventory
          </p>
        </div>

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
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {String(index + 1).padStart(2, "0")}
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
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/update-item/${product._id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
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
          {products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  #{String(index + 1).padStart(2, "0")}
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

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              No products are currently available in the inventory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
