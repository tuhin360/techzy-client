import Banner from "../Banner/Banner";
import NewProducts from "../NewProducts/NewProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";


const HomePage = () => {
    return (
        <div>
            <Banner/>
            <TrendingProducts/>
            <NewProducts/>
        </div>
    );
};

export default HomePage;