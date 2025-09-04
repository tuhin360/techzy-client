import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Techzy | Login</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Vector Illustration */}
            <div className="lg:w-1/2 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12"></div>

              {/* Vector illustration */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-64 h-64 mx-auto relative">
                    {/* User avatar circle */}
                    <div className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-16 h-16 text-yellow-500" />
                      </div>
                    </div>

                    {/* Floating elements */}
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
                  Welcome Back!
                </h2>
                <p className="text-white/90 text-lg">
                  Log in to explore the latest gadgets on TechZy.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                  Sign In
                </h1>

                {/* form start */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        //   value={formData.email}
                        //   onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        //   value={formData.password}
                        //   onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
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
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me and Forgot password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        //   checked={formData.remember}
                        //   onChange={handleChange}
                        className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center group cursor-pointer"
                  >
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                {/* form end */}

                {/* Social login divider */}
                <div className="mt-8 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social login buttons */}
                <SocialLogin />
                {/* Footer */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                    >
                      Sign up here
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

export default Login;
