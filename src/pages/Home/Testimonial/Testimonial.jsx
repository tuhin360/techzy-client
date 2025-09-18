import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch reviews dynamically
  const { data: testimonials = [], isLoading, error } = useQuery({
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
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            What Our{" "}
            <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Customers
            </span>{" "}
            Say
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mt-6">
            Real reviews from real customers who love our products and service
          </p>
        </div>

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
                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentTestimonial === index
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
