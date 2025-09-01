import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // একবারই ট্রিগার হবে
    threshold: 0.3,    // 30% visible হলে ট্রিগার
  });

  const stats = [
    {
      value: 98.5,
      suffix: "%",
      label: "Customer Satisfaction",
      color: "from-blue-500 to-cyan-400",
    },
    {
      value: 50000,
      suffix: "+",
      label: "Happy Customers",
      color: "from-green-400 to-emerald-500",
    },
    {
      value: 4.8,
      suffix: "★",
      label: "Average Rating",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section ref={ref} className="max-w-7xl mx-auto py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-[2px] bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Gradient Border Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-md opacity-40`}
              ></div>

              {/* Content */}
              <div className="relative bg-black rounded-2xl p-8 h-full flex flex-col items-center justify-center">
                <div
                  className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={3}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  ) : (
                    0
                  )}
                  {stat.suffix}
                </div>
                <p className="text-gray-300 text-lg mt-3">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;
