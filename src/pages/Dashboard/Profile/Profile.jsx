import { useState, useEffect } from "react";
import { User, Mail, Camera, Edit3 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className=" w-full flex items-center justify-center p-4">
      <div
        className={`w-full max-w-3xl transform transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Profile Card */}
        <div className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Cover Image */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-all duration-300">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 sm:px-8 pb-8 -mt-16 flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user?.displayName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <Edit3 className="w-4 h-4" />
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
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>

            {/* Edit Button */}
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
