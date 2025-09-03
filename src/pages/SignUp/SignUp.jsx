import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const image = data.photo[0]; // file input থেকে প্রথম image

    // formData বানাই image পাঠানোর জন্য
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=bc1aa9cda145ca4353091bcbb08066ce`;

    try {
      // imgbb এ upload
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();

      if (imgData.success) {
        const photoURL = imgData.data.display_url; // hosted image URL

        // এখন createUser এর সাথে এই photoURL পাঠাও
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log("User created:", loggedUser);

            // Firebase হলে profile update করতে পারো
            updateProfile(loggedUser, {
              displayName: data.name,
              photoURL: photoURL,
            }).then(() => {
              toast.success("Account created successfully!");
            });
          })
          .catch((error) => {
            console.error(error.message);
            toast.error(error.message);
          });
      } else {
        toast.error("Image upload failed!");
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Techzy | Sign Up</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side */}
            <div className="lg:w-1/2 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12"></div>

              {/* Illustration */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-16 h-16 text-yellow-500" />
                      </div>
                    </div>

                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Mail className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div
                      className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Lock className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="absolute top-1/2 -left-8 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Join Techzy Today!
                </h2>
                <p className="text-white/90 text-lg">
                  Sign up to discover the latest gadgets and exclusive deals.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                  Sign Up
                </h1>

                {/* Form Start */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <span className="text-red-500 mt-1 ml-2 text-sm">
                          Name field is required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className="text-red-500 mt-1 ml-2 text-sm">
                          Email field is required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/,
                        })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password?.type === "required" && (
                      <span className="text-red-500 mt-1 ml-2 text-sm">
                        Password is required
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500 mt-1 ml-2 text-sm">
                        Password must be at least 6 characters
                      </span>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <span className="text-red-500 mt-1 ml-2 text-sm">
                        Password must be less than 20 characters
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-500 mt-1 ml-2 text-sm">
                        Password must contain uppercase, lowercase, number, and
                        special character
                      </span>
                    )}
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-yellow-400 bg-gray-50 rounded-xl p-6 text-center transition-colors">
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            {...register("photo", { required: true })}
                            className="hidden"
                            id="photoUpload"
                          />
                          <label
                            htmlFor="photoUpload"
                            className="cursor-pointer text-yellow-600 hover:text-yellow-700 font-semibold"
                          >
                            Click to upload
                          </label>
                          <p className="text-gray-500 text-sm">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    {errors.photo && (
                      <span className="text-red-500 mt-1 ml-2 text-sm">
                        Profile photo is required
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center group cursor-pointer"
                  >
                    Sign Up
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
