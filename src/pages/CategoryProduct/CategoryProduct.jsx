import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ProductCard } from "../../components/ProductCard";
import useWishlist from "../../hooks/useWishlist"; // ✅ added

const CategoryProduct = () => {
  const { category } = useParams(); // from /category/:category
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlistIds, toggleWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);

    axiosPublic
      .get(`/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching category products:", err))
      .finally(() => setLoading(false));
  }, [category, axiosPublic]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
      <h1 className="text-3xl font-bold mb-6">{category} Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlistIds}
              toggleWishlist={toggleWishlist}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
