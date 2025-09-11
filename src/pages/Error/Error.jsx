import { Link } from "react-router-dom";
import errorImg from "../../../src/assets/404.gif";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center px-6">
      {/* Error Image */}
      <img
        src={errorImg}
        alt="404 Error"
        className="max-w-sm md:max-w-md lg:max-w-lg w-full mb-6 rounded-full"
      />

      {/* Error Text */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
   <Link to="/">
  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-md font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer">
    Back to Home
  </button>
</Link>

    </div>
  );
};

export default Error;
