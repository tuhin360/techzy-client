import { ArrowRight } from "lucide-react";
import { useProducts } from "../../../hooks/useProducts";
import { FridayOfferCardSkeleton } from "../../../components/FridayOfferCardSkeleton";

const gradients = [
  "from-pink-400 to-purple-500",
  "from-green-400 to-teal-500",
  "from-blue-400 to-cyan-500",
  "from-orange-400 to-pink-500",
];

const FridayOffer = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <FridayOfferCardSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  // Filter only "offered" tagged products
  const offeredProducts = products.filter((p) => p.tags?.includes("offered"));
  if (!offeredProducts.length)
    return <div className="text-center py-10">No offers available.</div>;

  const formatPrice = (price) => `৳${price?.toLocaleString("en-US") || 0}`;

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Friday{" "}
            <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Offers
            </span>
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mt-6">
            Grab exclusive deals on the latest gadgets today!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offeredProducts.map((offer, index) => {
            const gradient = gradients[index % gradients.length]; // Cycle through gradients
            return (
              <div
                key={offer._id}
                className={`relative bg-gradient-to-br ${gradient} rounded-xl shadow-lg overflow-hidden h-48 flex flex-col justify-between p-4`}
              >
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-white text-xs font-medium opacity-90">
                      {offer.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{offer.title}</h3>
                  <span className="text-lg font-bold text-white">{formatPrice(offer.price)}</span>
                </div>
                <button className="flex items-center space-x-1 bg-white hover:bg-gray-100 py-1.5 px-4 rounded-full font-semibold text-xs w-fit transition-colors duration-200">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Black Friday Main Deal (Full width, below 4 cards) */}
        <div className="mt-8">
          <div className="relative h-80 bg-black rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8 h-full flex flex-col justify-center text-center">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                HELLO, <br className="sm:hidden" />
                <span className="text-yellow-400">FRIDAY...</span>
              </h2>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-4">
                <div className="bg-yellow-400 text-black w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                  <span className="text-base sm:text-lg font-bold">15%</span>
                </div>
                <div className="bg-orange-500 text-white w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-bold">20%</span>
                </div>
                <div className="bg-red-500 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                  <span className="text-base sm:text-lg font-bold">25%</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-lg mb-2">YOUR PURCHASE TODAY ONLY!</p>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">WHILE YOUR OFFER LASTS...</p>
              <button className="bg-yellow-400 text-black py-2 sm:py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-lg mx-auto transition-colors duration-200 hover:bg-yellow-500">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridayOffer;
