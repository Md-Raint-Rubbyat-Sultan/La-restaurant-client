import { useQuery } from "@tanstack/react-query";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-hot-toast";
import PopularFoodCards from "./PopularFoodCards";

const PopularFoods = () => {
  const url = useAxiosSucre();

  const {
    isPending,
    isError,
    error,
    data: foods,
  } = useQuery({
    queryKey: ["popular-foods"],
    queryFn: () => url.get("/popular-foods").then((res) => res.data),
  });

  if (isPending) return <Spinner />;

  if (isError) return toast.error(error.message);

  console.log(foods);

  return (
    <div className="container mx-auto px-4 xl:px-0 my-28 xl:my-40 space-y-20">
      <h3 className="text-center text-5xl font-semibold">Popular in Menu</h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
        {foods?.map((food) => (
          <PopularFoodCards key={food?._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default PopularFoods;
