import { useState, useEffect } from "react";
import { User, Mail, Camera, Edit3 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center ">
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
            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-all duration-300 shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 sm:px-8 pb-10 -mt-20 flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="relative group mb-4">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-600 flex items-center justify-center">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user?.displayName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {user?.displayName || "Anonymous User"}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Edit Profile
              </button>
              <button className="px-6 py-3 bg-white/40 backdrop-blur-sm text-gray-800 rounded-2xl font-medium hover:bg-white/60 transition-all duration-300 transform hover:scale-105 shadow-md">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
