import { useQuery } from "@tanstack/react-query";
import HelmetTitle from "../../components/HelmeteTitle/HelmeteTitle";
import useAxiosSucre from "../../hooks/useAxiosSucre";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AllFoodsCard from "../../components/allFoodsCard/allFoodsCard";

const AllFoods = () => {
  const url = useAxiosSucre();
  const [currentPage, setCurrentPage] = useState(() => 0);
  const [perPage, setPerPage] = useState(() => 9);

  const {
    isPending,
    isError,
    error,
    data: foods,
  } = useQuery({
    queryKey: ["all-foods", perPage, currentPage],
    queryFn: () =>
      url
        .get(`/all-foods?page=${currentPage}&size=${perPage}`)
        .then((res) => res.data),
  });

  if (isPending) return <Spinner />;

  if (isError) return toast.error(error.message);

  const { allFoods, count } = foods;
  //   console.log(allFoods, count);

  const itemsPrePage = Math.ceil(count / parseInt(perPage));

  const totalPages = [...Array(itemsPrePage).keys()];
  //   console.log(totalPages);

  const handelSetPerPage = (e) => {
    setPerPage(() => e.target.value);
    setCurrentPage(() => 0);
  };

  return (
    <div className="container mx-auto px-4 xl:px-0 space-y-12 mb-12">
      <HelmetTitle title="La | All-foods" />
      <div className="space-y-6">
        <div className="flex items-center w-11/12 lg:w-3/4 mx-auto">
          <input
            className="input input-bordered rounded-r-none w-full"
            placeholder="Search food by name"
          />
          <button className="btn-form py-2 px-6">Search</button>
        </div>
        <div className="flex justify-center items-center gap-6 w-11/12 lg:w-3/4 mx-auto">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Filter
            </option>
            <option value="heigh">Price Heigh to Low</option>
            <option value="low">Price Low to Heigh</option>
          </select>
          <select
            defaultValue={perPage}
            onChange={handelSetPerPage}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="5">5</option>
            <option value="9">9</option>
            <option value="18">18</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {allFoods?.map((food) => (
          <AllFoodsCard key={food?._id} food={food} />
        ))}
      </div>
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

export default AllFoods;