import { useNavigate, useParams } from "react-router-dom";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const FoodPurchase = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [quantityValue, setQuantityValue] = useState(() => 1);
  const id = useParams();
  const url = useAxiosSucre();

  //   set date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const navigate = useNavigate();

  const currentDate = `${day}/${month + 1}/${year}`;

  // get single data
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

  //   console.log(foodDetails);

  const { _id, name, quantity, price, orderCount } = foodDetails;

  const handelOrderSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const addedQuantity = form.quantity.value;
    const userName = form.user.value;
    const addedTime = form.orderDate.value;

    // post info
    const orderInfo = {
      orderId: _id,
      user: userName,
      email: user?.email,
      addedQuantity,
      addedTime,
    };

    // update info
    const updatedInfo = {
      quantity: quantity - addedQuantity,
      orderCount: orderCount + parseInt(addedQuantity),
    };

    // console.log(orderInfo, updatedInfo);

    url
      .post("/food-orders", orderInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data?.acknowledged) {
          url
            .patch(`/update-all-food/${_id}`, updatedInfo)
            .then((res) => {
              if (res.data?.acknowledged) {
                navigate("/user/cart");
              }
            })
            .catch((er) => toast.error(er.message));
        }
      })
      .catch((er) => toast.error(er.message));
  };

  const handelQuantity = (e) => {
    const foodQuantity = e.target.value;
    if (foodQuantity > 0) {
      if (foodQuantity > quantity) {
        return toast.error(`Can not add food more than ${quantity}`);
      }
      setQuantityValue(() => foodQuantity);
      return console.log(foodQuantity);
    }
    toast.error("Can not add food less then 0");
  };

  return (
    <div>
      <HelmetTitle title="La | Purchase" />
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/condiments-prepare-italian-pasta_1220-429.jpg?w=1380&t=st=1699363198~exp=1699363798~hmac=36d2d8d9b06c4e25e0137e868502fe8cd4415eb8dd0f3248652f8a0a4a2123f8')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="min-h-screen flex justify-center items-center py-12"
      >
        <div className="w-11/12 md:w-full md:max-w-2xl shadow-2xl border-2 backdrop-blur-md  border-gray-300 rounded-lg">
          <h3 className="text-center text-5xl text-white font-bold mt-6">
            Order Summary{" "}
            {isLoading && (
              <span className="loading loading-spinner loading-md text-white font-bold"></span>
            )}
          </h3>
          <form onSubmit={handelOrderSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-xl md:text-3xl font-bold">
                  Food Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered"
                value={name}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Price
                  </span>
                </label>
                <input
                  type="text"
                  name="Price"
                  className="input input-bordered"
                  value={"$" + price}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Quantity
                  </span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="input input-bordered"
                  value={quantityValue}
                  onChange={handelQuantity}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Buyer Name
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="user"
                    className="input input-bordered w-full pe-14"
                    value={user?.displayName}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Buyer Email
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full pe-14"
                    value={user?.email}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-xl md:text-3xl font-bold">
                  Date
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="orderDate"
                  className="input input-bordered w-full pe-14"
                  defaultValue={currentDate}
                  readOnly
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn-form py-2">
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodPurchase;
