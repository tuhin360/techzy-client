import Banner from "../Banner/Banner";
import BestSellProduct from "../BestSellProduct/BestSellProduct";
import Cover from "../Cover/Cover";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import FridayOffer from "../FridayOffer/FridayOffer";
import NewProducts from "../NewProducts/NewProducts";
import StatSection from "../StatSection/StatSection";
import Testimonial from "../Testimonial/Testimonial";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Techzy | Home</title>
      </Helmet>
      <Banner />
      <NewProducts />
      <TrendingProducts />
      <Cover />
      <BestSellProduct />
      <FridayOffer />
      <FeaturedProduct />
      <StatSection />
      <Testimonial />
    </div>
  );
};

export default HomePage;
