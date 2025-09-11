import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const { user } = useAuth();

  // Calculate total price as number
  const totalPrice = Number(
    cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  );

  // Request client secret from backend when cart changes
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/payments/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Error getting clientSecret:", err));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");
    setSuccess("");
    setTransactionId("");

    try {
      // 1. Create payment method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (pmError) {
        setError(pmError.message);
        setProcessing(false);
        return;
      }

      // 2. Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email || "Unknown",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      // 3. Payment succeeded
      if (paymentIntent.status === "succeeded") {
        setSuccess("✅ Payment Successful!");
        setTransactionId(paymentIntent.id);

        // Send payment info to backend
        await axiosSecure.post("/payments", {
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100, // Stripe returns cents
          date: new Date(),
          cartItems: cart.map((item) => item._id),
          menuItems: cart.map((item) => item.menuId),
          status: "pending",
        });

        // ✅ Refetch cart to update sidebar instantly
        refetch();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Input */}
      <div className="p-4 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#2d3748",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className={`w-full py-3 ${
          processing ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
        } text-white font-semibold rounded-xl shadow-lg transition-all duration-300 cursor-pointer`}
      >
        {processing ? "Processing..." : `Pay $${totalPrice}`}
      </button>

      {/* Error / Success Messages */}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {success && (
        <div className="text-green-600 font-medium space-y-1">
          <p>{success}</p>
          {transactionId && (
            <p className="text-sm text-gray-700">
              Transaction ID: <span className="font-mono">{transactionId}</span>
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
