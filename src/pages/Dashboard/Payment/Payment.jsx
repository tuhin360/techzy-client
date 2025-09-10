import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Secure Payment
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your card details below to complete your purchase.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
