import Banner from "../../components/Banner/Banner";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import PopularFoods from "../../components/popularFoods/PopularFoods";

const Home = () => {
  return (
    <div>
      <HelmetTitle title="La | Home" />
      <Banner />
      <PopularFoods />
    </div>
  );
};

export default Home;
