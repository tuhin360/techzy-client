import Banner from "../Banner/Banner";
import Cover from "../Cover/Cover";
import NewProducts from "../NewProducts/NewProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";


const HomePage = () => {
    return (
        <div>
            <Banner/>
            <TrendingProducts/>
            <NewProducts/>
            <Cover/>
        </div>
    );
};

export default HomePage;