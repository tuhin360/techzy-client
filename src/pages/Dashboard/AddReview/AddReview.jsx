/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import Swal from "sweetalert2";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Watch the review input for word counting
  const reviewText = watch("review") || "";
  const wordCount = reviewText.trim() === "" ? 0 : reviewText.trim().split(/\s+/).length;

  // Submit handler
  const onSubmit = async (data) => {
    const review = {
      name: user?.displayName || "Anonymous",
      avatar: user?.photoURL,
      email: user?.email,
      details: data.review,
      rating,
    };

    try {
      setLoading(true); // start loading
      const res = await axiosSecure.post("/reviews", review);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Thank You!",
          text: "Your review has been submitted.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
        setRating(0);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="md:h-screen py-10 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <MdOutlineRateReview className="w-8 h-8 text-orange-600" />
          Give a Review
        </h1>
        <p className="text-gray-600">Please share your experience with us</p>
      </div>

      {/* Rating UI */}
      <div className="max-w-4xl mx-auto my-6 text-center">
        <h3 className="text-3xl font-cinzel">Rate Us!</h3>
        <div className="mt-4 flex justify-center">
          <Rating
            initialRating={rating}
            emptySymbol={<FaRegStar className="text-4xl text-orange-300" />}
            fullSymbol={<FaStar className="text-4xl text-orange-500" />}
            onChange={(value) => setRating(value)}
          />
        </div>
      </div>

      {/* Review Form */}
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          {/* Review Textarea */}
          <div>
            <label className="block mb-2 text-xl font-semibold">
              Tell us about your experience.
            </label>
            <textarea
              {...register("review", {
                required: "Review details are required",
                validate: (value) => {
                  const words = value.trim().split(/\s+/).length;
                  if (words < 10) return "Review must be at least 10 words";
                  if (words > 50) return "Review cannot exceed 40 words";
                  return true;
                },
              })}
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full px-5 py-6 h-36 text-xl focus:outline-none focus:ring focus:ring-orange-200 resize-none rounded-lg"
            ></textarea>

            {/* Word count display */}
            <p className="text-gray-500 text-sm mt-1">
              Word Count: {wordCount} / 50
            </p>

            {/* Error message */}
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn text-white text-xl font-semibold px-6 py-6 rounded-lg transition ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {loading ? "Adding Review..." : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
