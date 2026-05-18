import { useState, useEffect } from "react";
import { User, Mail, Camera, Edit3 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Instant display states
  const [profileName, setProfileName] = useState(user?.displayName || "");
  const [profilePhoto, setProfilePhoto] = useState(user?.photoURL || "");

  // Modal display toggles
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Edit Form Fields
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  // Password Fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setIsLoaded(true);
    if (user) {
      setProfileName(user.displayName || "");
      setProfilePhoto(user.photoURL || "");
    }
  }, [user]);

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Display Name cannot be empty!",
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile(editName, editPhoto);
      setProfileName(editName);
      setProfilePhoto(editPhoto);
      setIsEditModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile details have been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Profile",
        text: err.message || "An error occurred while updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long!",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mismatch Error",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserPassword(newPassword);
      setIsPasswordModalOpen(false);
      setNewPassword("");
      setConfirmPassword("");
      Swal.fire({
        icon: "success",
        title: "Password Changed!",
        text: "Your account credentials have been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Security Verification Required",
        text: err.message || "For security reasons, changing password requires a recent login. Please logout, log back in, and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Title + Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaRegUserCircle className="w-8 h-8 text-orange-600" />
            My Profile
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage and update your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div
          className={`bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Cover Image */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <button
              onClick={() => {
                setEditName(profileName);
                setEditPhoto(profilePhoto);
                setIsEditModalOpen(true);
              }}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 sm:px-8 pb-10 -mt-20 flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="relative group mb-4">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-600 flex items-center justify-center">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={profileName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <button
                onClick={() => {
                  setEditName(profileName);
                  setEditPhoto(profilePhoto);
                  setIsEditModalOpen(true);
                }}
                className="absolute bottom-2 right-2 p-2.5 bg-blue-500 rounded-full text-white shadow-lg transition-all duration-300 transform scale-100 hover:scale-110 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {profileName || "Anonymous User"}
            </h2>
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">
                {user?.email || "No email provided"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
              <button
                onClick={() => {
                  setEditName(profileName);
                  setEditPhoto(profilePhoto);
                  setIsEditModalOpen(true);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-800 rounded-2xl font-medium hover:bg-white/80 border border-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Edit Profile</h3>
            <p className="text-gray-500 text-sm mb-6">Update your public display name and profile picture URL.</p>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Photo URL</label>
                <input
                  type="url"
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-xl transition shadow-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h3>
            <p className="text-gray-500 text-sm mb-6">Enter your new secure account password.</p>
            
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 border border-gray-250 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-xl transition shadow-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
