import { useQuery } from "@tanstack/react-query";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import CartCards from "../../components/CartCards/CartCards";

const MyCart = () => {
  const { user } = useContext(AuthContext);
  const url = useAxiosSucre();

  const {
    isPending,
    isError,
    error,
    data: cartData,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      url.get(`/cart?email=${user?.email}`).then((res) => res.data),
  });

  if (isPending) return <Spinner />;

  if (isError) return toast.error(error.message);
  const { orders, extra } = cartData;
  console.log(extra);

  return (
    <div className="container mx-auto px-4 xl:px-0 space-y-12 mb-12">
      <HelmetTitle title="La | Cart" />
      <h1 className="text-5xl text-center font-bold">Order List</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {orders?.map((order, idx) => (
            <CartCards key={order?._id} order={order} idx={idx} extra={extra} />
          ))}
        </div>
      ) : (
        <h3 className="text-3xl font-medium text-center h-screen">
          No Food Ordered!
        </h3>
      )}
    </div>
  );
};

export default MyCart;
