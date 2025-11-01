import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      {/* Features section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-8 w-8 text-blue-400 mb-2" />
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-300">On orders over ৳5000</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-8 w-8 text-green-400 mb-2" />
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-300">100% Protected</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Headphones className="h-8 w-8 text-yellow-400 mb-2" />
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-300">Dedicated support</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CreditCard className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-300">7 days return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                Tech<span className="text-orange-400">Zy</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for the latest gadgets and electronics. We
              bring you cutting-edge technology at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition duration-200"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Special Deals
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/track-order"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/smartphones"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Smartphones
                </a>
              </li>
              <li>
                <a
                  href="/laptops"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Laptops & Computers
                </a>
              </li>
              <li>
                <a
                  href="/headphones"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Audio & Headphones
                </a>
              </li>
              <li>
                <a
                  href="/gaming"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Gaming Gear
                </a>
              </li>
              <li>
                <a
                  href="/cameras"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Cameras
                </a>
              </li>
              <li>
                <a
                  href="/accessories"
                  className="text-gray-300 hover:text-blue-400 transition duration-200"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Tech Street, Dhanmondi
                    <br />
                    Dhaka-1205, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+880 1234-567890</p>
                  <p className="text-gray-300 text-sm">+880 9876-543210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">support@techzy.com</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-white">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>
                &copy; 2024 TechZy. All rights reserved. | Developed with ❤️ in
                Bangladesh
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/refund"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                Refund Policy
              </a>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-2 md:mb-0">We Accept:</p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">
                  bKash
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">
                  Nagad
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">
                  Rocket
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">
                  Visa
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">
                  Mastercard
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
