import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* Outlet is into the navbar */}
      <Navbar />
      <Footer />
    </div>
  );
};

export default MainLayout;
