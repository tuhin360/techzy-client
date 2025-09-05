import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // const handleGoogleSignIn = () => {
  //   googleSignIn()
  //     .then((result) => {
  //       console.log(result.user);

  //       const userInfo = {
  //         email: result.user?.email,
  //         name: result.user?.displayName,
  //       };

  //       axiosPublic
  //         .post("/users", userInfo)
  //         .then((res) => {
  //           console.log("User created:", res.data);
  //           navigate("/");
  //         })
  //         .catch((err) => {
  //           if (err.response) {
  //             console.error("Error:", err.response.data);
  //           } else {
  //             console.error("Unexpected Error:", err.message);
  //           }
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Google SignIn error:", error);
  //     });
  // };

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
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FcGoogle className="text-red-500 w-6 h-6" />
          <span className="font-medium text-gray-700">Google</span>
        </button>

        {/* Facebook Button */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
        >
          <FaFacebook className="text-blue-600 w-6 h-6" />
          <span className="font-medium text-gray-700">Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
