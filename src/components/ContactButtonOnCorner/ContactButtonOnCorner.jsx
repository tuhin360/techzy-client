import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTimes,
  FaComments,
} from "react-icons/fa";

const ContactButtonOnCorner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Hide on small devices → `hidden md:flex`
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3">
      {/* Contact Buttons — expand to left when open */}
      <div
        className={`flex flex-row-reverse items-center gap-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-20 pointer-events-none"
        }`}
      >
        {/* Messenger */}
        <a
          href="https://m.me/bistroboss"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0084FF] hover:bg-[#006bbf] text-white rounded-full p-5 shadow-md flex items-center justify-center"
          title="Chat on Messenger"
        >
          <FaFacebookMessenger size={24} />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801300130885?text=Hello!%20I%20want%20to%20know%20more"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-5 shadow-md flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-5 shadow-lg transition duration-300"
        title={isOpen ? "Close Contact Options" : "Open Contact Options"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>
    </div>
  );
};

export default ContactButtonOnCorner;
