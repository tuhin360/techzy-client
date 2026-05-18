import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google SignIn error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
