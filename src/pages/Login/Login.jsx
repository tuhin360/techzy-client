import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, resetPassword, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Pre-fill email on mount if remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered-email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Auto-redirect if user is logged in (e.g. from mobile Google login redirect)
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        // Store or remove email in LocalStorage
        if (rememberMe) {
          localStorage.setItem("remembered-email", email);
        } else {
          localStorage.removeItem("remembered-email");
        }

        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      Swal.fire({
        title: "Reset Password",
        text: "Please enter your email address to receive a password reset link:",
        input: "email",
        inputPlaceholder: "Enter your email address",
        showCancelButton: true,
        confirmButtonText: "Send Link",
        confirmButtonColor: "#f97316",
        preConfirm: (emailInput) => {
          if (!emailInput) {
            Swal.showValidationMessage("Email is required");
          }
          return emailInput;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          triggerResetPassword(result.value);
        }
      });
    } else {
      triggerResetPassword(email);
    }
  };

  const triggerResetPassword = (emailAddress) => {
    resetPassword(emailAddress)
      .then(() => {
        Swal.fire({
          title: "Reset Link Sent",
          text: `A password reset link has been successfully sent to ${emailAddress}. Please check your inbox.`,
          icon: "success",
          confirmButtonColor: "#f97316",
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Techzy | Login</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Vector Illustration (Hidden on mobile/tablet to fit form perfectly) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 p-12 items-center justify-center relative overflow-hidden min-h-[550px]">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12"></div>

              {/* Vector illustration */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-56 h-56 mx-auto relative">
                    {/* User avatar circle */}
                    <div className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-14 h-14 text-yellow-500" />
                      </div>
                    </div>

                    {/* Floating elements */}
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
                  Welcome Back!
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  Log in to explore the latest gadgets on TechZy.
                </p>
              </div>
            </div>

            {/* Right Side - Form (Compact and fully visible on phone) */}
            <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 sm:mb-6">
                  Sign In
                </h1>

                {/* form start */}
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-5">
                  {/* Email field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full pl-9 pr-10 py-2 sm:py-2.5 text-sm border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your password"
                        required
                      />
                      {/* Eye icon toggle button */}
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
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="ml-1.5 text-xs text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-yellow-600 hover:text-yellow-700 font-semibold hover:underline bg-transparent border-0 cursor-pointer p-0"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-2 sm:py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-md flex items-center justify-center group cursor-pointer text-sm"
                  >
                    Sign In
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
                {/* form end */}

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
                <div className="text-center mt-3">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>

                {/* Back to Home Button */}
                <div className="text-center mt-5">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-orange-500 transition-colors bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-full border border-gray-200 cursor-pointer"
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

export default Login;
