import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SharedTitleSection from "../../../components/SharedTitleSection/SharedTitleSection";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch reviews dynamically
  const {
    data: testimonials = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching reviews
      </div>
    );

  if (testimonials.length === 0)
    return (
      <div className="text-center py-10 text-gray-600">
        No reviews available.
      </div>
    );

  const current = testimonials[currentTestimonial];

  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SharedTitleSection
          title="What Our"
          highlight="Customers Say"
          subtitle="Real reviews from real customers who love our products and service"
        />

        {/* Main Testimonial Display */}
        <div className="relative max-w-3xl mx-auto mb-10 border-gray-300">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote className="w-16 h-16 text-blue-600" />
            </div>

            {/* Current Testimonial */}
            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {current.rating}.0
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                "{current.details}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {current.name}
                    </h4>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="group p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
                  </button>

                  <button
                    onClick={nextTestimonial}
                    className="group p-3 bg-orange-600 rounded-2xl shadow-sm hover:shadow-md hover:bg-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  >
                    <ChevronRight className="w-5 h-5 text-white group-hover:text-orange-50 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`group relative transition-all duration-700 ease-in-out transform ${
                currentTestimonial === index
                  ? "w-10 h-3"
                  : "w-3 h-3 hover:scale-110"
              }`}
            >
              {/* Background glow effect for active state */}
              {currentTestimonial === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur-sm opacity-40 scale-150 transition-all duration-700"></div>
              )}

              {/* Main dot/pill */}
              <div
                className={`relative w-full h-full rounded-full transition-all duration-700 ease-in-out ${
                  currentTestimonial === index
                    ? "bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 shadow-lg shadow-orange-200/50"
                    : "bg-gray-200 group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:to-gray-400"
                }`}
              >
                {/* Inner highlight for active state */}
                {currentTestimonial === index && (
                  <div className="absolute inset-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-60 transition-opacity duration-500"></div>
                )}
              </div>

              {/* Focus ring for accessibility */}
              <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-focus:ring-orange-300/50 group-focus:ring-offset-2 transition-all duration-500"></div>

              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 scale-75 group-active:opacity-30 group-active:scale-150 transition-all duration-300"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
