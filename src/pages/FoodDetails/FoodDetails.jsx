import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";

const FoodDetails = () => {
  const id = useParams();
  const url = useAxiosSucre();

  const {
    isPending,
    isError,
    error,
    data: foodDetails,
  } = useQuery({
    queryKey: ["single-food"],
    queryFn: () => url.get(`/single-food/${id?.id}`).then((res) => res.data),
  });

  if (isPending) return <Spinner />;

  if (isError) return toast.error(error.message);

  console.log(foodDetails);

  return (
    <div>
      <p>food details</p>
    </div>
  );
};

export default FoodDetails;
