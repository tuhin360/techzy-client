import {
  Upload,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Registration = () => {
  return (
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
                Join Our Community
              </h2>
              <p className="text-white/90 text-lg">
                Create your account today and unlock amazing features designed
                just for you.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h1>

              <div className="space-y-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                      placeholder="Enter your email"
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
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-yellow-400 rounded-xl focus:outline-none transition-colors"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* Photo upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 hover:border-yellow-400 bg-gray-50 rounded-xl p-6 text-center transition-colors">
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <div>
                        <button
                          type="button"
                          className="text-yellow-600 hover:text-yellow-700 font-semibold"
                        >
                          Click to upload
                        </button>
                        <p className="text-gray-500 text-sm">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center group"
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
