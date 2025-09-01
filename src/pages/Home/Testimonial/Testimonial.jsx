import React, { useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
} from "lucide-react";

const Testimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      location: "Dhaka, Bangladesh",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      review:
        "Absolutely amazing service! I ordered an iPhone and it arrived the next day in perfect condition. The customer support team was incredibly helpful throughout the entire process. Will definitely shop here again!",
      product: "iPhone 15 Pro",
      verified: true,
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Mohammad Rahman",
      location: "Chittagong, Bangladesh",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      review:
        "Best electronics store in Bangladesh! The prices are competitive and the quality is top-notch. I've bought multiple items including a laptop and headphones - everything exceeded my expectations.",
      product: "ASUS ROG Laptop",
      verified: true,
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Fatima Khan",
      location: "Sylhet, Bangladesh",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4,
      review:
        "Great experience shopping here. The website is easy to navigate and the delivery was prompt. The Apple Watch I ordered works perfectly and came with all original accessories.",
      product: "Apple Watch Series 9",
      verified: true,
      date: "3 days ago",
    },
    {
      id: 4,
      name: "Karim Hassan",
      location: "Rajshahi, Bangladesh",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 5,
      review:
        "Outstanding quality and service! I was skeptical about buying expensive electronics online, but this store proved me wrong. Fast delivery, genuine products, and excellent customer care.",
      product: "Canon EOS R6 Mark II",
      verified: true,
      date: "5 days ago",
    },
    {
      id: 5,
      name: "Nusrat Jahan",
      location: "Khulna, Bangladesh",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 5,
      review:
        "Love this store! The AirPods I bought sound incredible and the battery life is exactly as advertised. Plus, the packaging was premium and the delivery was super fast. Highly recommended!",
      product: "Apple AirPods Pro",
      verified: true,
      date: "1 week ago",
    },
  ];

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

  return (
    <section className="my-20 sm:rounded-none md:rounded-xl">
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
                      i < testimonials[currentTestimonial].rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {testimonials[currentTestimonial].rating}.0
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                "{testimonials[currentTestimonial].review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h4 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                      <span>{testimonials[currentTestimonial].name}</span>
                      {testimonials[currentTestimonial].verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                          Verified
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{testimonials[currentTestimonial].location}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Purchased: {testimonials[currentTestimonial].product} •{" "}
                      {testimonials[currentTestimonial].date}
                    </div>
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
