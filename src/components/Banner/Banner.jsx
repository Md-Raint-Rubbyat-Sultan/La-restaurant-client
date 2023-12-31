import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="overflow-hidden relative h-[300px] md:h-[500px] lg:h-[700px] xl:h-[800px]">
      <motion.div
        animate={{
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
        }}
      >
        <figure>
          <img
            className="w-full h-[300px] md:h-[500px] lg:h-[700px] xl:h-[800px]"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="banner"
          />
        </figure>
      </motion.div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center gap-6">
        <h3 className="text-white text-5xl lg:text-7xl font-semibold">
          EAT WHAT <br /> YOU LOVE
        </h3>
        <p className="text-white font-bold text-center">
          THE FINEST INGREDIENTS FOR THE FINEST MOMENTS
        </p>
        <Link to={"/all-foods"}>
          <button className="btn-banner px-6 py-2">ALL FOODS</button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
