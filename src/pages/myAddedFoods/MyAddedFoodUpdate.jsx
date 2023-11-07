import { useNavigate, useParams } from "react-router-dom";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyAddedFoodUpdate = () => {
  const { isLoading } = useContext(AuthContext);
  const id = useParams();
  const url = useAxiosSucre();
  const navigate = useNavigate();

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

  const { _id, category, description, img, name, origin, quantity, price } =
    foodDetails;

  //   console.log(foodDetails);

  const handelUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const origin = form.origin.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const photo = form.photo.value;
    const description = form.description.value;
    const updates = {
      name,
      category,
      origin,
      price,
      quantity,
      photo,
      description,
    };

    //quantity validate
    if (isNaN(quantity)) return toast.error("Quantity must be a number");
    if (typeof quantity !== "number")
      return toast.error("Quantity must be a number.");
    if (quantity < 0) return toast.error("Quantity can not less than 0.");

    // price validate
    if (isNaN(price)) return toast.error("Quantity must be a number");
    if (typeof price !== "number")
      return toast.error("Quantity must be a number.");
    if (price < 0) return toast.error("Quantity can not less than 0.");
    // console.log(updates);

    url
      .put(`/user/update-added-food/${_id}`, updates)
      .then((res) => {
        if (res.data?.acknowledged) {
          toast.success("Update Successful!");
          navigate("/user/added-foods", { replace: true });
        }
      })
      .catch((er) => toast.error(er.message));
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
            Update Food{" "}
            {isLoading && (
              <span className="loading loading-spinner loading-md text-white font-bold"></span>
            )}
          </h3>
          <form onSubmit={handelUpdateFood} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-xl md:text-3xl font-bold">
                  Food Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input input-bordered"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Category
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="category"
                    defaultValue={category}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Origin
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="origin"
                    defaultValue={origin}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
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
                  name="price"
                  className="input input-bordered"
                  defaultValue={price}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl md:text-3xl font-bold">
                    Quantity
                  </span>
                </label>
                <input
                  type="text"
                  name="quantity"
                  className="input input-bordered"
                  defaultValue={quantity}
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-xl md:text-3xl font-bold">
                  Image URL
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="photo"
                  defaultValue={img}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-xl md:text-3xl font-bold">
                  Description
                </span>
              </label>
              <div className="relative">
                <textarea
                  type="text"
                  name="description"
                  defaultValue={description}
                  className="textarea textarea-bordered w-full h-40"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn-form py-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAddedFoodUpdate;
