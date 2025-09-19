import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SharedScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="hidden md:block fixed bottom-6 right-6 z-50 p-3 rounded-full 
          bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg 
          hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SharedScrollToTop;
