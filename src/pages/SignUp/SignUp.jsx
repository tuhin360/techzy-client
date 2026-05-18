import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { createUser, user } = useContext(AuthContext);

  // Auto-redirect if user is logged in (e.g. from mobile Google login redirect)
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Form submit handler
  const onSubmit = async (data) => {
    let photoURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default avatar

    if (data.photo && data.photo[0]) {
      const image = data.photo[0];
      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=bc1aa9cda145ca4353091bcbb08066ce`;

      try {
        // Upload image to imgbb
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const imgData = await res.json();

        if (!imgData.success) {
          Swal.fire("Error", "Image upload failed!", "error");
          return;
        }

        photoURL = imgData.data.display_url;
      } catch (error) {
        console.error("Image upload error:", error);
        Swal.fire("Error", "Something went wrong during image upload!", "error");
        return;
      }
    }

    try {
      // Create Firebase user
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;

          // Update Firebase profile
          updateProfile(loggedUser, {
            displayName: data.name,
            photoURL: photoURL,
          }).then(() => {
            // Add user to database
            const userInfo = { name: data.name, email: data.email };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset(); // clear form
                setImagePreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                Swal.fire(
                  "Success",
                  "Account created successfully!",
                  "success"
                ).then(() => {
                  navigate(from, { replace: true });
                });
              }
            });
          });
        })
        .catch((error) => {
          console.error("SignUp error:", error);
          const errMsg = error.message || "";
          if (
            error.code === "auth/email-already-in-use" ||
            errMsg.includes("auth/email-already-in-use") ||
            errMsg.includes("email-already-in-use")
          ) {
            Swal.fire({
              title: "Email Already Registered",
              text: "This email address is already in use. Please use a different email or log in.",
              icon: "warning",
              confirmButtonColor: "#f59e0b",
            });
          } else {
            Swal.fire({
              title: "Sign Up Failed",
              text: error.message || "Something went wrong while creating your account.",
              icon: "error",
              confirmButtonColor: "#f59e0b",
            });
          }
        });
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Techzy | Sign Up</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side Illustration (Hidden on mobile/tablet to fit form perfectly) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 p-12 items-center justify-center relative overflow-hidden min-h-[550px]">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12"></div>

              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-56 h-56 mx-auto relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-14 h-14 text-yellow-500" />
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Mail className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div
                      className="absolute -bottom-3 -left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Lock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="absolute top-1/2 -left-6 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Join Techzy Today!
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  Sign up to discover the latest gadgets and exclusive deals.
                </p>
              </div>
            </div>

            {/* Right Side Form (Compact and fully visible on phone) */}
            <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 sm:mb-6">
                  Sign Up
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <span className="text-red-500 mt-1 ml-2 text-xs block">
                          Name field is required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className="text-red-500 mt-1 ml-2 text-xs block">
                          Email field is required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/,
                        })}
                        className="w-full pl-9 pr-10 py-2 sm:py-2.5 text-sm border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 mt-1 ml-2 text-xs block">
                        Must be 6-20 characters, include uppercase, lowercase, number & special char
                      </span>
                    )}
                  </div>

                  {/* Profile Photo */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Profile Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-yellow-400 bg-gray-50 rounded-xl p-3 sm:p-5 text-center transition-colors">
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            {...register("photo", { required: false })}
                            className="hidden"
                            id="photoUpload"
                            ref={fileInputRef}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setImagePreview(URL.createObjectURL(file));
                                setValue("photo", e.target.files, {
                                  shouldValidate: true,
                                });
                                clearErrors("photo");
                              }
                            }}
                          />
                          <label
                            htmlFor="photoUpload"
                            className="cursor-pointer text-yellow-600 hover:text-yellow-700 font-semibold text-xs sm:text-sm"
                          >
                            Click to upload
                          </label>
                          <p className="text-gray-500 text-xs">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="mt-3 flex justify-center relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                              setValue("photo", null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-2 sm:py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-md flex items-center justify-center group cursor-pointer text-sm pt-2"
                  >
                    Sign Up
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>

                {/* Social login divider */}
                <div className="my-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social login buttons */}
                <SocialLogin />

                {/* Footer */}
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                {/* Back to Home Button */}
                <div className="text-center mt-5">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-orange-500 transition-colors bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-full border border-gray-250 cursor-pointer"
                  >
                    <span>← Back to Home</span>
                  </Link>
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
