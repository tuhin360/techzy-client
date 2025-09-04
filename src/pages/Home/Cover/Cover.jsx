import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Clock,
  Zap,
  Gift,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import alexa from "../../../assets/products/cover/alexa.png";
import headphone from "../../../assets/products/cover/headphone.png";
import { Link } from "react-router-dom";

const Cover = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] pb-20">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-ping"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rotate-45 opacity-20 animate-spin"></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left: Alexa with Premium Effects */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-110"></div>

              {/* Product Highlight Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/30 scale-110 animate-pulse"></div>

              <img
                src={alexa}
                alt="Smart Speaker"
                className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300/3b82f6/ffffff?text=Smart+Speaker";
                }}
              />

              {/* Floating Price Tag */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl font-bold shadow-2xl animate-bounce">
                <div className="text-sm">From</div>
                <div className="text-lg">৳12,999</div>
              </div>
            </div>
          </div>

          {/* Center: Premium Deal Content */}
          <div className="text-center order-1 lg:order-2">
            {/* Luxury Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-black mb-6 shadow-2xl animate-pulse">
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              MEGA TECH FESTIVAL
              <Sparkles className="w-5 h-5 ml-2 animate-spin" />
            </div>

            {/* Main Headlines */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg">
                HOT
              </span>
              <br />
              <span className="text-white drop-shadow-lg">DEALS</span>
            </h1>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-2xl">
              <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                UP TO 70% OFF
              </p>
              <p className="text-gray-700 font-medium">Limited Time Only</p>
            </div>

            {/* Elegant Countdown */}
            <div className="mb-10">
              <p className="text-white/90 font-semibold mb-4 text-lg">
                Deal Ends In:
              </p>
              <div className="flex justify-center space-x-3 md:space-x-6">
                {[
                  {
                    label: "DAYS",
                    value: timeLeft.days,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "HOURS",
                    value: timeLeft.hours,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "MINS",
                    value: timeLeft.minutes,
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    label: "SECS",
                    value: timeLeft.seconds,
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={`bg-gradient-to-br ${item.color} p-4 md:p-6 rounded-2xl shadow-2xl min-w-[70px] md:min-w-[90px] group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-2xl md:text-4xl font-black text-white">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs md:text-sm text-white/80 font-bold">
                        {item.label}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/shop">
                <button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </Link>

              <Link to="/shop">
                <button className="group border-3 border-white/80 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-lg backdrop-blur-sm bg-white/10 hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3">
                  <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>All Deals</span>
                </button>
              </Link>
            </div>

            {/* Luxury Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">25K+ Reviews</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold">Authentic</span>
              </div>
            </div>
          </div>

          {/* Right: Headphone with Premium Effects */}
          <div className="flex justify-center lg:justify-end order-3">
            <div className="relative group">
              {/* Multi-layer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 scale-125"></div>

              {/* Product Highlight Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/30 scale-110 animate-pulse delay-500"></div>

              <img
                src={headphone}
                alt="Premium Headphones"
                className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Headphones";
                }}
              />

              {/* Floating Discount Tag */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl font-bold shadow-2xl animate-bounce delay-1000">
                <div className="text-sm">Save Up To</div>
                <div className="text-lg">70% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        .group:hover img {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Cover;
