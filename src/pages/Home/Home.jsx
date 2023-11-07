import AboutUs from "../../components/AboutUs/AboutUs";
import Banner from "../../components/Banner/Banner";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import OurBlogs from "../../components/OurBlogs/OurBlogs";
import PopularFoods from "../../components/popularFoods/PopularFoods";

const Home = () => {
  return (
    <div>
      <HelmetTitle title="La | Home" />
      <Banner />
      <PopularFoods />
      <OurBlogs />
      <AboutUs />
    </div>
  );
};

export default Home;
