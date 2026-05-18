import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Mail, Trash2, Users } from "lucide-react";
import Swal from "sweetalert2";

const ManageSubscribers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: subscribers = [], refetch, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter/subscribers");
      return res.data;
    },
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubscribers = subscribers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle Remove Subscriber
  const handleDelete = async (subscriber) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to remove ${subscriber.email} from the newsletter?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove them!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/newsletter/subscribers/${subscriber._id}`);

        if (res.data.success) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: `${subscriber.email} has been unsubscribed successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while removing the subscriber.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
            <p className="text-gray-600">
              Manage your email marketing audience and subscribers
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Subscribers
              </p>
              <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscriber Directory
          </h2>
          <p className="text-sm text-gray-600">
            View active email newsletter subscriptions
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-16">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Subscription Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-500 font-medium">
                    Loading subscribers list...
                  </td>
                </tr>
              ) : currentSubscribers.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.subscribedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500 font-medium">
              Loading subscribers...
            </div>
          ) : currentSubscribers.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  #{String(startIndex + index + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-gray-400">
                  {new Date(item.subscribedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <p className="font-semibold text-gray-900 truncate flex-1">{item.email}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-[11px] text-gray-400">
                  {new Date(item.subscribedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && subscribers.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscribers yet
            </h3>
            <p className="text-gray-600">
              Your newsletter audience is currently empty.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && subscribers.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-2 pb-16">
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
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
  );
};

export default ManageSubscribers;
