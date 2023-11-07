import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import MyAddedFoodCards from "../../components/MyaddedFoodCards/MyaddedFoodCards";
import Swal from "sweetalert2";

const MyAddedFoods = () => {
  const { user } = useContext(AuthContext);
  const url = useAxiosSucre();
  const [currentPage, setCurrentPage] = useState(() => 0);

  const {
    isPending,
    isError,
    error,
    data: addedFoods,
    refetch,
  } = useQuery({
    queryKey: ["addedFoods", currentPage],
    queryFn: () =>
      url
        .get(
          `/user/added-foods?email=${user?.email}&page=${currentPage}&size=9`
        )
        .then((res) => res.data),
  });

  if (isPending) return <Spinner />;

  if (isError) return toast.error(error.message);

  const { foodUserAdd, count } = addedFoods;

  const itemsPrePage = Math.ceil(count / 9);

  const totalPages = [...Array(itemsPrePage).keys()];
  //   console.log(foodUserAdd, count, totalPages);

  const handelFoodDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        url
          .delete(`/user/delete-a-added-food/${id}`)
          .then((res) => {
            if (res.data?.result?.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((er) => toast.error(er.message));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 xl:px-0 space-y-12 mb-12">
      <HelmetTitle title="La | My Added Food" />
      <h2 className="text-4xl font-semibold text-center">
        Food added by {user?.displayName && user.displayName}
      </h2>
      {foodUserAdd.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {foodUserAdd?.map((addedFood) => (
            <MyAddedFoodCards
              key={addedFood?._id}
              addedFood={addedFood}
              handelFoodDelete={handelFoodDelete}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-3xl font-medium text-center h-screen">
          No Food is Added By You!
        </h3>
      )}
      <div className="flex justify-center items-center flex-wrap gap-5">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:text-white hover:bg-black"
          disabled={currentPage === 0 ? true : false}
        >
          Previous
        </button>
        {totalPages.map((totalPage) => (
          <button
            onClick={() => setCurrentPage(() => totalPage)}
            className={`px-4 py-2 border-2 border-gray-300 ${
              currentPage === totalPage ? "bg-black text-white" : ""
            } rounded-lg text-lg font-semibold`}
            key={totalPage}
          >
            {totalPage + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((next) => next + 1)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:text-white hover:bg-black"
          disabled={currentPage === totalPages.length - 1 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyAddedFoods;
