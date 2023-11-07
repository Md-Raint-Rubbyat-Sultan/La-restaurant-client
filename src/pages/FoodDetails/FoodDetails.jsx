import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const id = useParams();
  const navigate = useNavigate();
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

  // console.log(foodDetails);
  const {
    _id,
    category,
    description,
    img,
    name,
    origin,
    quantity,
    price,
    userEmail,
    userName,
  } = foodDetails;

  const handelOrder = () => {
    if (user?.email === userEmail)
      return toast.error("You can't order your own product!");
    if (quantity <= 0) return toast.error("Sorry! Not available.");
    navigate(`/food-orders/${_id}`);
  };

  return (
    <div className="container mx-auto px-4 xl:px-0 space-y-12 mb-12">
      <HelmetTitle title="La | Details" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-6">
        <figure className="md:col-span-2 lg:col-span-3">
          <img
            className="max-h-[700px] rounded-lg mx-auto"
            src={img}
            alt={name}
          />
        </figure>
        <div className="flex justify-start md:justify-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <p>
              <span className="font-semibold">Category:</span> {category}
            </p>
            <p>
              <span className="font-semibold">Origin:</span> {origin}
            </p>
            <p>
              <span className="font-semibold">Made By:</span> {userName}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ${price}
            </p>
            <div>
              <button onClick={handelOrder} className="btn-banner px-4 py-2">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-semibold">Description:</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FoodDetails;
