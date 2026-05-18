import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { CreditCard, Wallet, MapPin, Phone, User, ShieldCheck, Tag, X, Gift } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessingSSL, setIsProcessingSSL] = useState(false);

  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const [cart] = useCart();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const totalPrice = Number(
    cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  );

  const finalPrice = Number((totalPrice - discountAmount).toFixed(2));

  // Handle Coupon Apply
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a promo code!");
      return;
    }

    setIsApplyingCoupon(true);
    const toastId = toast.loading("Validating promo code...");

    try {
      const res = await axiosSecure.post("/coupons/validate", {
        code: couponCode.trim(),
        totalPrice: totalPrice,
      });

      if (res.data.success) {
        setAppliedCoupon(res.data);
        setDiscountAmount(res.data.discountAmount);
        toast.success(
          `Promo "${res.data.code}" applied successfully! Saved ৳${(res.data.discountAmount * 115).toLocaleString()}`,
          { id: toastId }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Invalid or expired promo code.", { id: toastId });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Handle Coupon Remove
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    toast.success("Promo code removed.");
  };

  const handleSSLPayment = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Billing phone number is required!");
      return;
    }
    if (!address.trim()) {
      toast.error("Billing address is required!");
      return;
    }

    setIsProcessingSSL(true);
    const toastId = toast.loading("Initializing secure SSLCommerz session...");

    try {
      const paymentData = {
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuId),
        totalPrice: finalPrice, // Send dynamic discounted price
        userEmail: user?.email,
        userName: user?.displayName || "Customer",
        userPhone: phone,
        userAddress: address,
        couponCode: appliedCoupon?.code || null, // Send coupon code if present
      };

      const res = await axiosSecure.post("/payments/ssl-initiate", paymentData);
      if (res.data.url) {
        toast.success("Redirecting to secure gateway...", { id: toastId });
        window.location.replace(res.data.url);
      } else {
        toast.error("Failed to generate payment link", { id: toastId });
        setIsProcessingSSL(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to initiate payment.", { id: toastId });
      setIsProcessingSSL(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-orange-100 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-orange-50 rounded-2xl mb-4 text-orange-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Checkout & Secure Payment
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Choose your preferred method to complete transaction securely.
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 sm:p-6 mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-orange-800 uppercase tracking-wider">
              Total Payable Amount
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Includes all items currently in your cart
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-2">
              {discountAmount > 0 && (
                <span className="text-base line-through text-gray-400 font-medium">
                  ৳{(totalPrice * 115).toLocaleString()}
                </span>
              )}
              <p className="text-3xl font-black text-orange-600">
                ৳{(finalPrice * 115).toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              approx. ${finalPrice} USD
            </p>
          </div>
        </div>

        {/* Dynamic Promo Code Box */}
        <div className="bg-white border-2 border-dashed border-orange-200 rounded-2xl p-5 mb-8">
          {!appliedCoupon ? (
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Have a Promo/Coupon Code?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Code (e.g. TECHZY20)"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-gray-800 text-sm focus:outline-none transition-colors uppercase font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplyingCoupon || totalPrice <= 0}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">
                Try codes: <strong className="text-orange-500">TECHZY20</strong> (20%), <strong className="text-orange-500">SAVE10</strong> (10%), or <strong className="text-orange-500">MEGA50</strong> (50%)
              </p>
            </form>
          ) : (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-emerald-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-lg animate-bounce">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm uppercase tracking-wide">
                    🎟️ {appliedCoupon.code} Applied!
                  </h5>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    Saved {appliedCoupon.discountPercent}% off (৳{(discountAmount * 115).toLocaleString()})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="p-1.5 hover:bg-emerald-100 rounded-full transition-colors text-emerald-600 hover:text-emerald-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Stripe Toggle */}
          <div
            onClick={() => setPaymentMethod("stripe")}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              paymentMethod === "stripe"
                ? "border-orange-500 bg-orange-50/30 shadow-md"
                : "border-gray-200 hover:border-orange-200 bg-white"
            }`}
          >
            <div className={`p-3 rounded-xl ${
              paymentMethod === "stripe" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Stripe Card</h4>
              <p className="text-xs text-gray-500 mt-0.5">International cards</p>
            </div>
          </div>

          {/* SSLCommerz Toggle */}
          <div
            onClick={() => setPaymentMethod("sslcommerz")}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              paymentMethod === "sslcommerz"
                ? "border-orange-500 bg-orange-50/30 shadow-md"
                : "border-gray-200 hover:border-orange-200 bg-white"
            }`}
          >
            <div className={`p-3 rounded-xl ${
              paymentMethod === "sslcommerz" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">SSLCommerz</h4>
              <p className="text-xs text-gray-500 mt-0.5">bKash, Nagad, Local banks</p>
            </div>
          </div>
        </div>

        {/* Forms Rendering */}
        {paymentMethod === "stripe" ? (
          <div className="space-y-6">
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Card Billing Details
              </p>
              {/* Force Elements remount when price changes to fetch new clientSecret */}
              <Elements stripe={stripePromise} key={finalPrice}>
                <CheckoutForm coupon={appliedCoupon} discountedPrice={finalPrice} />
              </Elements>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSSLPayment} className="space-y-6 border-t border-gray-100 pt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Billing & Delivery Information (Required)
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name (ReadOnly) */}
              <div className="relative">
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={user?.displayName || "Anonymous Customer"}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Customer Phone (Required Input) */}
              <div className="relative">
                <label className="text-xs font-semibold text-orange-600 block mb-1">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-gray-800 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Customer Address (Required Input) */}
            <div className="relative">
              <label className="text-xs font-semibold text-orange-600 block mb-1">
                Full Shipping Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, City, Area postal code"
                  required
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-gray-800 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* SSL Submit Button */}
            <button
              type="submit"
              disabled={isProcessingSSL || totalPrice <= 0}
              className={`w-full py-4 text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isProcessingSSL || totalPrice <= 0
                  ? "bg-gray-300 shadow-none cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 active:scale-[0.99]"
              }`}
            >
              <Wallet className="w-5 h-5" />
              {isProcessingSSL ? "Initializing Secure Channel..." : `Pay ৳${(finalPrice * 115).toLocaleString()} via SSLCommerz`}
            </button>
          </form>
        )}

        {/* Secure badge */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            256-bit SSL Encrypted Transaction. Powered by SSLCommerz and Stripe.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Payment;
