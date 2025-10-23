import { Mail, Phone, MapPin, Send, User, MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s+()-]{11,}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  // Validate all fields
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "user_name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!validateName(value)) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "user_email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid phone number (at least 11 digits)";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (!validateMessage(value)) {
          error = "Message must be at least 10 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "subject") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      user_name: true,
      user_email: true,
      phone: true,
      message: true
    });

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setAlertMessage({
        type: "error",
        text: "❌ Please fix all errors before submitting"
      });
      setTimeout(() => setAlertMessage(null), 5000);
      return;
    }

    setIsSending(true);
    setAlertMessage(null);

    emailjs
      .send(
        "service_rw14j24",
        "template_6m0qdwh",
        formData,
        "1fUGboxoEk715gn9R"
      )
      .then(
        () => {
          setIsSending(false);
          setAlertMessage({
            type: "success",
            text: "✅ Your message has been sent successfully!"
          });
          setFormData({
            user_name: "",
            user_email: "",
            phone: "",
            subject: "General Inquiry",
            message: ""
          });
          setErrors({});
          setTouched({});
          setTimeout(() => setAlertMessage(null), 5000);
        },
        (error) => {
          setIsSending(false);
          setAlertMessage({
            type: "error",
            text: `❌ Failed to send message. ${error.text || "Please try again later."}`
          });
          setTimeout(() => setAlertMessage(null), 5000);
        }
      );
  };

  const isFormValid =
    formData.user_name.trim() !== "" &&
    formData.user_email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.message.trim() !== "" &&
    validateEmail(formData.user_email) &&
    validatePhone(formData.phone) &&
    validateName(formData.user_name) &&
    validateMessage(formData.message);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 text-lg mb-8">
                Reach out to us through any of the following channels. We're here to help!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">support@techzy.com</p>
                    <p className="text-gray-600">hello@techzy.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Tech Street</p>
                    <p className="text-gray-600">Digital City, DC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Business Hours</h3>
              <div className="space-y-2 text-orange-100">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            {/* Alert Message */}
            {alertMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  alertMessage.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                <p className="font-medium">{alertMessage.text}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                    errors.user_name && touched.user_name
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.user_name && touched.user_name && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.user_name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                    errors.user_email && touched.user_email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.user_email && touched.user_email && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.user_email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                    errors.phone && touched.phone
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && touched.phone && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>


              {/* Message */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg transition-colors resize-none ${
                    errors.message && touched.message
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  placeholder="Tell us how we can help you... (minimum 10 characters)"
                ></textarea>
                {errors.message && touched.message && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSending || !isFormValid}
                className={`w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${
                  isSending || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Send className="w-5 h-5" />
                <span>{isSending ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Us</h3>
              <p className="text-gray-600">Visit our office location</p>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-orange-600" />
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm">123 Tech Street, Digital City, DC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;