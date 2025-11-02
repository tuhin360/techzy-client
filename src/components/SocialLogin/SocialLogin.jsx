import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          console.log("User already exists, continue...");
        } else {
          throw err;
        }
      }

      navigate("/");
    } catch (error) {
      console.error("Google SignIn error:", error);
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
