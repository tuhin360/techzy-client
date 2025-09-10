import useCart from "../../../hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  //   console.log(cart);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  const axiosSecure = useAxiosSecure();

  // Handle quantity changes (you'll need to implement these functions)
  const handleIncreaseQuantity = (id) => {
    // Implement increase quantity logic
    console.log("Increase quantity for item:", id);
  };

  const handleDecreaseQuantity = (id) => {
    // Implement decrease quantity logic
    console.log("Decrease quantity for item:", id);
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/carts/${id}`);
          if (res.data.success) {
            refetch(); // refresh cart instantly
            Swal.fire("Removed!", "Item removed successfully.", "success");
          } else {
            Swal.fire(
              "Failed!",
              res.data.message || "Could not remove the item.",
              "error"
            );
          }
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handlePayment = () => {
    // Implement payment logic
    console.log("Proceed to payment");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-orange-600" />
          Shopping Cart
        </h1>
        <p className="text-gray-600">Review your items before checkout</p>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <Link to="/shop">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cart.length}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Price
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link to="/dashboard/payment">
                <button
                  onClick={handlePayment}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 min-w-[200px] cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Pay
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.title}
                        </h3>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ৳{item.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item._id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item._id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-orange-600">
                        ৳{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {cart.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-orange-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.category || "Electronics"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-orange-600">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm text-gray-600">
                        ${item.price?.toFixed(2)} each
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1">
                        <button
                          onClick={() => handleDecreaseQuantity(item._id)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item._id)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
