import { Store, Truck, Shield, ArrowRight, Star, Users } from "lucide-react";
import headphoneGirl from "../../assets/banner/2.jpg";

const About = () => {
  const features = [
    {
      id: 1,
      title: "Premium Quality",
      description:
        "Authentic electronics from top brands like Apple, Sony, Samsung, and more.",
      icon: Store,
    },
    {
      id: 2,
      title: "Fast Shipping",
      description:
        "Nationwide delivery with quick, reliable, and tracked service.",
      icon: Truck,
    },
    {
      id: 3,
      title: "Trusted Service",
      description:
        "Hassle-free returns, warranty support, and dedicated customer care.",
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rafiq Ahmed",
      location: "Dhaka",
      rating: 5,
      comment:
        "Fast delivery and original product! I bought an Apple Watch and it came with full warranty. Highly recommend Techzy.",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      location: "Chittagong",
      rating: 5,
      comment:
        "Excellent customer service. They helped me choose the right headphones and even followed up after delivery.",
    },
    {
      id: 3,
      name: "Tahmid Rahman",
      location: "Sylhet",
      rating: 4,
      comment:
        "Great prices on gadgets. Only took 2 days to receive my order. Will shop again!",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Founded Techzy",
      description:
        "Started as a small online store with a mission to bring authentic tech to Bangladesh.",
    },
    {
      year: "2021",
      title: "Expanded Product Range",
      description:
        "Added smartphones, wearables, and audio gear from global brands.",
    },
    {
      year: "2022",
      title: "Launched Nationwide Delivery",
      description:
        "Partnered with trusted couriers for fast and safe delivery across all divisions.",
    },
    {
      year: "2024",
      title: "10,000+ Happy Customers",
      description:
        "Celebrated a major milestone with over 10,000 satisfied customers and 4.9-star rating.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
            About{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Techzy
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto md:mx-0">
            Your premier destination for cutting-edge electronics in Bangladesh.
            We bring you the latest gadgets with authenticity, quality, and
            unmatched service.
          </p>
        </div>

        {/* Mission & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              At Techzy, we empower every customer with the latest technology.
              Since 2020, we've been delivering genuine electronics at
              unbeatable prices across Bangladesh. Our passion for innovation
              drives us to bring you the best gadgets from global brands,
              ensuring trust and satisfaction.
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              We strive to make technology accessible, reliable, and fun for
              everyone. Whether you’re looking for premium audio, smart
              wearables, or the latest smartphones, Techzy is your one-stop shop
              for all things tech.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={headphoneGirl}
              alt="Tech Trend Store"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* ✅ Why Choose Us - Gradient Background */}
        <div className="mb-16 rounded-3xl overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
            Why Choose Us
          </h2>
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ CTA - Gradient Background */}
        <div className="mb-16 rounded-3xl overflow-hidden text-center md:text-left">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12 px-6 sm:px-12 text-white shadow-xl">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Discover the Future of Tech
                </h3>
                <p className="text-blue-100 text-sm sm:text-base max-w-md">
                  Shop our curated collection of electronics and elevate your
                  digital experience with premium gadgets.
                </p>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md transform hover:scale-105">
                Explore Products <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* ✅ New Section 2: Our Journey Timeline */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Our Journey
          </h2>
          <div className="relative max-w-4xl mx-auto mt-12">
            {/* Central Vertical Line (behind cards) */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 via-purple-500 to-blue-600 transform -translate-x-1/2 z-0"></div>

            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0; // Even = left, Odd = right

              return (
                <div
                  key={item.year}
                  className={`relative flex ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-6 mb-16`}
                >
                  {/* Year Badge (on left or right) */}
                  <div className="flex-shrink-0 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg transform transition-transform hover:scale-110">
                      {item.year}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div
                    className={`z-10 bg-white p-6 rounded-2xl shadow-md md:w-96 transform transition-all duration-300 hover:shadow-xl ${
                      isLeft
                        ? "md:ml-10 md:mr-auto text-left"
                        : "md:mr-10 md:ml-auto text-right"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
