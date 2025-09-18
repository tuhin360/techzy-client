const SharedTitleSection = ({ title, highlight, subtitle }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
        
        {/* Accent Line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SharedTitleSection;