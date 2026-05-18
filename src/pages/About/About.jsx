import { useState, useRef, useEffect } from "react";
import { Store, Truck, Shield, ArrowRight, Play, Pause, Flame } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import { Link } from "react-router-dom";
import headphoneGirl from "../../assets/banner/2.jpg";

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const features = [
    {
      id: 1,
      title: "Premium Quality",
      description: "Direct partnerships with Apple, Sony, Samsung, and top global brands ensure 100% authentic tech products.",
      icon: Store,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Hyper-Speed Shipping",
      description: "Next-day delivery inside Dhaka and fully-tracked express nationwide shipping for ultimate convenience.",
      icon: Truck,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: 3,
      title: "2-Year Shield Warranty",
      description: "Enjoy absolute peace of mind with our official warranties, hassle-free returns, and lifetime technical support.",
      icon: Shield,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "TechZy Innovation Initiated",
      description: "Founded as a specialized MERN online technology boutique to address authentic high-end tech gaps in Bangladesh.",
    },
    {
      year: "2021",
      title: "Direct Global Integrations",
      description: "Signed official retail integration terms, adding wearable smart gear, audios, and high-fidelity devices.",
    },
    {
      year: "2022",
      title: "Integrated Secure Gateways",
      description: "Added top-tier encrypted checkout systems including Stripe, SSLCommerz local banking and EMI frameworks.",
    },
    {
      year: "2024",
      title: "The Ultimate Gadget Space",
      description: "Reached over 50,000 satisfied tech lovers nationwide while carrying a stellar 4.9 average consumer satisfaction score.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Techzy | About & Innovation</title>
      </Helmet>

      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 relative overflow-hidden">
        
        {/* Floating background glowing highlights */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <SharedTitleSection
            title="THE FUTURE OF"
            highlight="TECHZY"
            subtitle="Pioneering absolute tech authenticities, premium sound innovations, and seamless secure payments for every citizen in Bangladesh."
          />

          {/* Cinematic Video & Innovation Statement Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 mt-12">
            
            {/* Left: About Statement & Pillars */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-600 font-bold text-xs uppercase tracking-widest">
                <Flame className="w-4 h-4 animate-bounce" />
                Next-Gen Tech Hub
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-gray-900">
                Crafting the Absolute <br />
                <span className="bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Elite Gadget Experience
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                TechZy isn't just an e-commerce platform—it is a secure gateway to global innovation. We believe technology should elevate your lifestyle, unlock your creative potential, and keep you connected effortlessly. That's why we curate only the highest performing gadgets.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-orange-500/30 shadow-sm hover:shadow transition-all">
                  <div className="text-2xl font-black text-orange-500">100%</div>
                  <div className="text-xs text-gray-500 font-semibold mt-1">Authentic Guarantee</div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-orange-500/30 shadow-sm hover:shadow transition-all">
                  <div className="text-2xl font-black text-purple-600">256-Bit</div>
                  <div className="text-xs text-gray-500 font-semibold mt-1">Encrypted Payment</div>
                </div>
              </div>
            </div>

            {/* Right: Immersive Media Grid (Video + Lady Pic) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-2xl">
              
              {/* Card 1: Cinematic Video Container */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl h-[300px] sm:h-[380px]">
                  {/* Embedded High Definition Video */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover scale-102 transition-transform duration-700 hover:scale-105"
                    src="https://assets.mixkit.co/videos/preview/mixkit-young-man-listening-to-music-with-headphones-40097-large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  
                  {/* Cinematic Overlay & Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
                          TechZy Live
                        </p>
                        <h4 className="text-sm font-black text-white mt-0.5">
                          Motion Beats
                        </h4>
                      </div>
                      <button
                        onClick={toggleVideo}
                        className="p-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                    </div>
                    
                    {/* Floating Equalizer */}
                    <div className="flex items-end gap-1 mt-3 opacity-70">
                      <span className="w-0.5 bg-orange-500 rounded-t h-3 animate-[pulse_1s_infinite]"></span>
                      <span className="w-0.5 bg-orange-500 rounded-t h-5 animate-[pulse_1.2s_infinite]"></span>
                      <span className="w-0.5 bg-orange-500 rounded-t h-2 animate-[pulse_0.8s_infinite]"></span>
                      <span className="w-0.5 bg-orange-500 rounded-t h-6 animate-[pulse_1.5s_infinite]"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Lady enjoying music on headphones */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-600 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl h-[300px] sm:h-[380px]">
                  <img
                    src={headphoneGirl}
                    alt="Lady enjoying music on headphones"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div>
                      <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest">
                        TechZy Lifestyles
                      </p>
                      <h4 className="text-sm font-black text-white mt-0.5">
                        Immersive Sound Revolution
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">
                      Experience absolute audio precision with ergonomic custom fits and noise-cancellation shields.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Why Choose Us Grid */}
          <div className="mb-24">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-12 tracking-tight text-gray-900">
              Why Innovation Lovers Choose <span className="text-orange-500">TechZy</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-orange-500/30 hover:bg-orange-50/10 transition-all duration-300 transform hover:-translate-y-2 group shadow-md hover:shadow-xl"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Call to Action */}
          <div className="mb-24 rounded-3xl overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-800 opacity-95"></div>
            
            <div className="relative py-16 px-8 sm:px-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Discover the Future of Tech
                </h3>
                <p className="text-orange-50/80 text-sm sm:text-base max-w-md font-medium">
                  Shop our curated, validated innovation arrays and take your digital performance to the next level.
                </p>
              </div>
              <Link to="/shop">
                <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-extrabold rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95 cursor-pointer">
                  Explore Products <ArrowRight className="w-5 h-5 ml-2 text-orange-600" />
                </button>
              </Link>
            </div>
          </div>

          {/* Vertical Journey Timeline */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-16 tracking-tight text-gray-900">
              Our Journey Pathway
            </h2>
            <div className="relative max-w-4xl mx-auto mt-12">
              {/* Central Vertical Connector line */}
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600 transform -translate-x-1/2 z-0 opacity-40"></div>

              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.year}
                    className={`relative flex ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-6 mb-16`}
                  >
                    {/* Circle badge */}
                    <div className="flex-shrink-0 z-10">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white flex items-center justify-center font-black shadow-lg transform transition-transform hover:scale-110 duration-300">
                        {item.year}
                      </div>
                    </div>

                    {/* Timeline card with glassmorphism */}
                    <div
                      className={`z-10 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl md:w-[380px] transform transition-all duration-300 hover:shadow-2xl hover:border-orange-500/30 shadow-md ${
                        isLeft
                          ? "md:ml-10 md:mr-auto text-left"
                          : "md:mr-10 md:ml-auto text-right"
                      }`}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
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
    </>
  );
};

export default About;
