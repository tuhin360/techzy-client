import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Users, UserCheck, Shield, Trash2, Edit, Crown } from "lucide-react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleToggleRole = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to toggle role for ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggle it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${user._id}`).then((res) => {
          if (res.data.success) {
            refetch();
            Swal.fire(
              "Updated!",
              `${user.email} is now ${res.data.newRole}`,
              "success"
            );
          }
        });
      }
    });
  };

  const handleDeleteUser = async (user) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete ${user.name || user.email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${user._id}`);

        if (res.data.success) {
          refetch(); // refresh users list instantly
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${user.name || "User"} has been deleted successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text:
              res.data.message ||
              `Could not delete ${user.name || "this user"}.`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Something went wrong while deleting ${user.name || "the user"}.`,
      });
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
        <UserCheck className="w-3 h-3 mr-1" />
        User
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Users
              </p>
              <p className="text-3xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            User Management
          </h2>
          <p className="text-sm text-gray-600">
            View and manage all registered users
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
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          user.photoURL ||
                          user.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || user.displayName || "User"
                          )}&background=f97316&color=ffffff`
                        }
                        alt={user.name || user.displayName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name || user.displayName || "Unknown User"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleToggleRole(user)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Shield className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Delete User"
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
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3 border border-gray-100"
            >
              {/* Top section: serial & role */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                {getRoleBadge(user.role)}
              </div>

              {/* User info */}
              <div className="flex items-center space-x-3">
                <img
                  src={
                    user.photoURL ||
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || user.displayName || "User"
                    )}&background=f97316&color=ffffff`
                  }
                  alt={user.name || user.displayName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.name || user.displayName || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleToggleRole(user)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-orange-600 border border-orange-300 hover:bg-orange-50 rounded-lg transition"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Make Admin</span>
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition"
                  title="Delete User"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              No users are currently registered in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
