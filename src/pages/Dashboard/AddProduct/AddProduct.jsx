import { useState } from "react";
import { Plus, X, Upload, ArrowRight } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Audio",
    "Camera",
    "Drone",
    "Wearables",
    "Mobile",
    "Computing",
    "Accessories",
    "Virtual assistant",
    "Gaming Headphone",
    "Smartwatches",
    "Airpod",
  ];

  const badges = [
    "Best Seller",
    "Adventure Cam",
    "Aerial Pro",
    "Premium Audio",
    "Most Popular",
    "Flagship",
    "Gaming Beast",
    "Hot Deal",
    "Pro Choice",
    "New Arrival",
    "Trending",
    "Limited Edition",
    "Best Value",
  ];

  const availableTags = [
    "new",
    "trending",
    "best-seller",
    "featured",
    "offered",
  ];

  // React Hook Form setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      price: "",
      originalPrice: "",
      discount: "",
      rating: "",
      reviews: "",
      image: "",
      badge: "",
      category: "",
      sold: "",
      features: [{ value: "" }],
      colors: [{ value: "" }],
      timeLeft: "",
      tags: [],
    },
  });

  // Field arrays for dynamic features and colors
  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  // Watch price values for auto-discount calculation
  const watchedPrice = watch("price");
  const watchedOriginalPrice = watch("originalPrice");

  // Handle tag selection
  const handleTagChange = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    setValue("tags", newSelectedTags);
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=bc1aa9cda145ca4353091bcbb08066ce`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();

      if (imgData.success) {
        return imgData.data.display_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      let imageUrl = data.imageUrl;

      // Upload image if file is selected
      if (data.imageFile && data.imageFile[0]) {
        imageUrl = await handleImageUpload(data.imageFile[0]);
      }

      // Calculate discount if not provided
      const calculatedDiscount =
        data.discount ||
        (data.originalPrice && data.price
          ? Math.round(
              ((data.originalPrice - data.price) / data.originalPrice) * 100
            )
          : 0);

      // Prepare product data
      const productData = {
        title: data.title,
        subtitle: data.subtitle || undefined,
        description: data.description,
        price: parseFloat(data.price),
        originalPrice: parseFloat(data.originalPrice),
        discount: calculatedDiscount,
        rating: parseFloat(data.rating) || 0,
        reviews: parseInt(data.reviews) || 0,
        image: imageUrl,
        badge: data.badge || undefined,
        category: data.category,
        sold: parseInt(data.sold) || 0,
        features: data.features.map((f) => f.value).filter((f) => f.trim()),
        colors: data.colors.map((c) => c.value).filter((c) => c.trim()),
        timeLeft: data.timeLeft || undefined,
        tags: selectedTags,
      };

      // Send to backend
      const response = await axiosSecure.post("/products", productData);

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
          confirmButtonColor: "#f59e0b",
        });

        // Reset form
        reset();
        setSelectedTags([]);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product. Please try again.",
        icon: "error",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>TechZy | Add Product</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add New Product
                </h1>
                <p className="text-gray-600 mt-1">
                  Fill in the product details below
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-blue-500 rounded"></div>
                    Basic Information
                  </h2>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "Product title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.title ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter product title"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    {...register("subtitle")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter product subtitle"
                  />
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Product description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Describe your product in detail..."
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Pricing Section */}
                <div className="lg:col-span-2 mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-green-500 rounded"></div>
                    Pricing & Sales
                  </h2>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Price (৳) *
                  </label>
                  <input
                    type="number"
                    {...register("price", {
                      required: "Current price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.price ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="0"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Original Price (৳) *
                  </label>
                  <input
                    type="number"
                    {...register("originalPrice", {
                      required: "Original price is required",
                      validate: (value) =>
                        parseFloat(value) >= parseFloat(watchedPrice) ||
                        "Original price must be greater than or equal to current price",
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.originalPrice
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    placeholder="0"
                  />
                  {errors.originalPrice && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.originalPrice.message}
                    </span>
                  )}
                </div>

                {/* Discount & Sold */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount (%)
                    <span className="text-gray-500 text-xs ml-1">
                      Auto-calculated
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("discount")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={
                      watchedPrice && watchedOriginalPrice
                        ? Math.round(
                            ((watchedOriginalPrice - watchedPrice) /
                              watchedOriginalPrice) *
                              100
                          ).toString()
                        : "Auto-calculated"
                    }
                  />
                  {/* Real-time discount display */}
                  {watchedPrice && watchedOriginalPrice && (
                    <div className="mt-1 text-sm text-blue-600">
                      Auto-calculated:{" "}
                      {Math.round(
                        ((watchedOriginalPrice - watchedPrice) /
                          watchedOriginalPrice) *
                          100
                      )}
                      % discount
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Units Sold
                  </label>
                  <input
                    type="number"
                    {...register("sold")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>

                {/* Product Details */}
                <div className="lg:col-span-2 mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-purple-500 rounded"></div>
                    Product Details
                  </h2>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.category ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </span>
                  )}
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Badge
                  </label>
                  <select
                    {...register("badge")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select badge</option>
                    {badges.map((badge) => (
                      <option key={badge} value={badge}>
                        {badge}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image
                  </label>

                  {/* Image URL Option */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      {...register("imageUrl")}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center mb-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 rounded-xl p-6 text-center transition-colors">
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          {...register("imageFile")}
                          onChange={handleImageChange}
                          className="hidden"
                          id="imageUpload"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Click to upload image
                        </label>
                        <p className="text-gray-500 text-sm">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>

                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-lg mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    {...register("rating", {
                      min: { value: 0, message: "Rating must be at least 0" },
                      max: { value: 5, message: "Rating cannot exceed 5" },
                    })}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="4.5"
                  />
                  {errors.rating && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.rating.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    {...register("reviews")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time Left (for deals)
                  </label>
                  <input
                    type="text"
                    {...register("timeLeft")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="2 days left"
                  />
                </div>

                {/* Features */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features
                  </label>
                  {featureFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 mb-3">
                      <input
                        type="text"
                        {...register(`features.${index}.value`)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter feature"
                      />
                      {featureFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendFeature({ value: "" })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>

                {/* Colors */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Colors
                  </label>
                  {colorFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 mb-3">
                      <input
                        type="text"
                        {...register(`colors.${index}.value`)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter color"
                      />
                      {colorFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendColor({ value: "" })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Color
                  </button>
                </div>

                {/* Tags */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagChange(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setSelectedTags([]);
                      setImagePreview(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg font-semibold flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Adding Product..." : "Add Product"}
                    {!isSubmitting && (
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

// import { useState } from 'react';
// import { Plus, X, Upload, Save, ArrowRight } from 'lucide-react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';

// const AddProduct = () => {
//   const axiosPublic = useAxiosPublic();
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);

//   const categories = [
//     'Audio', 'Camera', 'Drone', 'Wearables', 'Mobile', 'Computing',
//     'Accessories', 'Virtual assistant', 'Gaming Headphone', 'Smartwatches', 'Airpod'
//   ];

//   const badges = [
//     'Best Seller', 'Adventure Cam', 'Aerial Pro', 'Premium Audio',
//     'Most Popular', 'Flagship', 'Gaming Beast', 'Hot Deal', 'Pro Choice',
//     'New Arrival', 'Trending', 'Limited Edition', 'Best Value'
//   ];

//   const availableTags = ['new', 'trending', 'best-seller', 'featured', 'offered'];

//   // React Hook Form setup
//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     defaultValues: {
//       title: '',
//       subtitle: '',
//       description: '',
//       price: '',
//       originalPrice: '',
//       discount: '',
//       rating: '',
//       reviews: '',
//       image: '',
//       badge: '',
//       category: '',
//       sold: '',
//       features: [{ value: '' }],
//       colors: [{ value: '' }],
//       timeLeft: '',
//       tags: []
//     }
//   });

//   // Field arrays for dynamic features and colors
//   const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
//     control,
//     name: 'features'
//   });

//   const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
//     control,
//     name: 'colors'
//   });

//   // Watch price values for auto-discount calculation
//   const watchedPrice = watch('price');
//   const watchedOriginalPrice = watch('originalPrice');

//   // Handle tag selection
//   const handleTagChange = (tag) => {
//     const newSelectedTags = selectedTags.includes(tag)
//       ? selectedTags.filter(t => t !== tag)
//       : [...selectedTags, tag];

//     setSelectedTags(newSelectedTags);
//     setValue('tags', newSelectedTags);
//   };

//   // Handle image upload
//   const handleImageUpload = async (file) => {
//     if (!file) return null;

//     const formData = new FormData();
//     formData.append("image", file);

//     const url = `https://api.imgbb.com/1/upload?key=bc1aa9cda145ca4353091bcbb08066ce`;

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         body: formData,
//       });

//       const imgData = await res.json();

//       if (imgData.success) {
//         return imgData.data.display_url;
//       } else {
//         throw new Error('Image upload failed');
//       }
//     } catch (error) {
//       console.error('Image upload error:', error);
//       throw error;
//     }
//   };

//   // Handle image file change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Form submit handler
//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = data.imageUrl;

//       // Upload image if file is selected
//       if (data.imageFile && data.imageFile[0]) {
//         imageUrl = await handleImageUpload(data.imageFile[0]);
//       }

//       // Calculate discount if not provided
//       const calculatedDiscount = data.discount ||
//         (data.originalPrice && data.price ?
//           Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100) : 0);

//       // Prepare product data
//       const productData = {
//         title: data.title,
//         subtitle: data.subtitle || undefined,
//         description: data.description,
//         price: parseFloat(data.price),
//         originalPrice: parseFloat(data.originalPrice),
//         discount: calculatedDiscount,
//         rating: parseFloat(data.rating) || 0,
//         reviews: parseInt(data.reviews) || 0,
//         image: imageUrl,
//         badge: data.badge || undefined,
//         category: data.category,
//         sold: parseInt(data.sold) || 0,
//         features: data.features.map(f => f.value).filter(f => f.trim()),
//         colors: data.colors.map(c => c.value).filter(c => c.trim()),
//         timeLeft: data.timeLeft || undefined,
//         tags: selectedTags
//       };

//       // Send to backend
//       const response = await axiosPublic.post('/products', productData);

//       if (response.data.insertedId) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Product added successfully!',
//           icon: 'success',
//           confirmButtonColor: '#f59e0b'
//         });

//         // Reset form
//         reset();
//         setSelectedTags([]);
//         setImagePreview(null);
//       }

//     } catch (error) {
//       console.error('Error adding product:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to add product. Please try again.',
//         icon: 'error',
//         confirmButtonColor: '#f59e0b'
//       });
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>TechZy | Add Product</title>
//       </Helmet>

//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center gap-4 mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//                 <p className="text-gray-600 mt-1">Fill in the product details below</p>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//                 {/* Basic Information */}
//                 <div className="lg:col-span-2">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <div className="w-2 h-6 bg-blue-500 rounded"></div>
//                     Basic Information
//                   </h2>
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Product Title *
//                   </label>
//                   <input
//                     type="text"
//                     {...register("title", {
//                       required: "Product title is required",
//                       minLength: { value: 3, message: "Title must be at least 3 characters" }
//                     })}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       errors.title ? 'border-red-500' : 'border-gray-200'
//                     }`}
//                     placeholder="Enter product title"
//                   />
//                   {errors.title && (
//                     <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
//                   )}
//                 </div>

//                 {/* Subtitle */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Subtitle
//                   </label>
//                   <input
//                     type="text"
//                     {...register("subtitle")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter product subtitle"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     {...register("description", {
//                       required: "Product description is required",
//                       minLength: { value: 10, message: "Description must be at least 10 characters" }
//                     })}
//                     rows={4}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       errors.description ? 'border-red-500' : 'border-gray-200'
//                     }`}
//                     placeholder="Describe your product in detail..."
//                   />
//                   {errors.description && (
//                     <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
//                   )}
//                 </div>

//                 {/* Pricing Section */}
//                 <div className="lg:col-span-2 mt-8">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <div className="w-2 h-6 bg-green-500 rounded"></div>
//                     Pricing & Sales
//                   </h2>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Current Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     {...register("price", {
//                       required: "Current price is required",
//                       min: { value: 1, message: "Price must be greater than 0" }
//                     })}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       errors.price ? 'border-red-500' : 'border-gray-200'
//                     }`}
//                     placeholder="0"
//                   />
//                   {errors.price && (
//                     <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>
//                   )}
//                 </div>

//                 {/* Original Price */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Original Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     {...register("originalPrice", {
//                       required: "Original price is required",
//                       validate: value => parseFloat(value) >= parseFloat(watchedPrice) || "Original price must be greater than or equal to current price"
//                     })}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       errors.originalPrice ? 'border-red-500' : 'border-gray-200'
//                     }`}
//                     placeholder="0"
//                   />
//                   {errors.originalPrice && (
//                     <span className="text-red-500 text-sm mt-1">{errors.originalPrice.message}</span>
//                   )}
//                 </div>

//                 {/* Discount & Sold */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Discount (%)
//                     <span className="text-gray-500 text-xs ml-1">Auto-calculated</span>
//                   </label>
//                   <input
//                     type="number"
//                     {...register("discount")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder={watchedPrice && watchedOriginalPrice ?
//                       Math.round(((watchedOriginalPrice - watchedPrice) / watchedOriginalPrice) * 100).toString() :
//                       "Auto-calculated"
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Units Sold
//                   </label>
//                   <input
//                     type="number"
//                     {...register("sold")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="0"
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div className="lg:col-span-2 mt-8">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <div className="w-2 h-6 bg-purple-500 rounded"></div>
//                     Product Details
//                   </h2>
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     {...register("category", { required: "Please select a category" })}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       errors.category ? 'border-red-500' : 'border-gray-200'
//                     }`}
//                   >
//                     <option value="">Select category</option>
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                   {errors.category && (
//                     <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
//                   )}
//                 </div>

//                 {/* Badge */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Badge
//                   </label>
//                   <select
//                     {...register("badge")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     <option value="">Select badge</option>
//                     {badges.map(badge => (
//                       <option key={badge} value={badge}>{badge}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Product Image
//                   </label>

//                   {/* Image URL Option */}
//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-600 mb-2">Image URL</label>
//                     <input
//                       type="url"
//                       {...register("imageUrl")}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="https://example.com/image.jpg"
//                     />
//                   </div>

//                   {/* OR Divider */}
//                   <div className="flex items-center mb-4">
//                     <div className="flex-1 border-t border-gray-300"></div>
//                     <span className="px-4 text-gray-500 text-sm">OR</span>
//                     <div className="flex-1 border-t border-gray-300"></div>
//                   </div>

//                   {/* File Upload */}
//                   <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 rounded-xl p-6 text-center transition-colors">
//                     <div className="space-y-2">
//                       <Upload className="w-8 h-8 text-gray-400 mx-auto" />
//                       <div>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           {...register("imageFile")}
//                           onChange={handleImageChange}
//                           className="hidden"
//                           id="imageUpload"
//                         />
//                         <label
//                           htmlFor="imageUpload"
//                           className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
//                         >
//                           Click to upload image
//                         </label>
//                         <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
//                       </div>
//                     </div>

//                     {imagePreview && (
//                       <div className="mt-4">
//                         <img
//                           src={imagePreview}
//                           alt="Preview"
//                           className="w-24 h-24 object-cover rounded-lg mx-auto"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating & Reviews */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Rating (0-5)
//                   </label>
//                   <input
//                     type="number"
//                     {...register("rating", {
//                       min: { value: 0, message: "Rating must be at least 0" },
//                       max: { value: 5, message: "Rating cannot exceed 5" }
//                     })}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="4.5"
//                   />
//                   {errors.rating && (
//                     <span className="text-red-500 text-sm mt-1">{errors.rating.message}</span>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Number of Reviews
//                   </label>
//                   <input
//                     type="number"
//                     {...register("reviews")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="0"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Time Left (for deals)
//                   </label>
//                   <input
//                     type="text"
//                     {...register("timeLeft")}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="2 days left"
//                   />
//                 </div>

//                 {/* Features */}
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Features
//                   </label>
//                   {featureFields.map((field, index) => (
//                     <div key={field.id} className="flex gap-3 mb-3">
//                       <input
//                         type="text"
//                         {...register(`features.${index}.value`)}
//                         className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Enter feature"
//                       />
//                       {featureFields.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => appendFeature({ value: '' })}
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Feature
//                   </button>
//                 </div>

//                 {/* Colors */}
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Available Colors
//                   </label>
//                   {colorFields.map((field, index) => (
//                     <div key={field.id} className="flex gap-3 mb-3">
//                       <input
//                         type="text"
//                         {...register(`colors.${index}.value`)}
//                         className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Enter color"
//                       />
//                       {colorFields.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeColor(index)}
//                           className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => appendColor({ value: '' })}
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Color
//                   </button>
//                 </div>

//                 {/* Tags */}
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Tags
//                   </label>
//                   <div className="flex flex-wrap gap-3">
//                     {availableTags.map(tag => (
//                       <button
//                         key={tag}
//                         type="button"
//                         onClick={() => handleTagChange(tag)}
//                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                           selectedTags.includes(tag)
//                             ? 'bg-blue-500 text-white'
//                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         {tag}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8 pt-6 border-t">
//                 <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       reset();
//                       setSelectedTags([]);
//                       setImagePreview(null);
//                     }}
//                     className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
//                   >
//                     Reset Form
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg font-semibold flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? 'Adding Product...' : 'Add Product'}
//                     {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProduct;
