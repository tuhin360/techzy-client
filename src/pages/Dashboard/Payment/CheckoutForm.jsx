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
  const [processing, setProcessing] = useState(false); // ✅ prevent double payment
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const { user } = useAuth();
  console.log({user});
  console.log(user.email);

  // calculate total price (rounded)
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  // get client secret from backend
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/payments/create-payment-intent", { price: totalPrice }) // ✅ corrected endpoint
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error getting clientSecret:", err);
        });
    }
  }, [axiosSecure, totalPrice]);

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");
    setSuccess("");

    // 1. Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setProcessing(false);
      return;
    }

    console.log("✅ Payment Method Created:", paymentMethod);

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

    // 3. Check payment status
    if (paymentIntent.status === "succeeded") {
      setSuccess("Payment Successful!");
      console.log("🎉 Payment Success:", paymentIntent);

      // 👉 Optional: save payment info to DB
      try {
        await axiosSecure.post("/payments", {
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100, // ✅ Stripe returns in cents
          date: new Date(),
          cartItems: cart.map((item) => item._id),
        });
      } catch (dbError) {
        console.error("Failed to save payment to DB:", dbError);
      }
    }

    setProcessing(false);
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
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
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
        {processing ? "Processing..." : "Pay Now"}
      </button>

      {/* Error / Success Messages */}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
