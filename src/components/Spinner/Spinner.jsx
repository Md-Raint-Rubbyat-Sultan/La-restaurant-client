const Spinner = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
      <h3 className="text-3xl">
        Loading <span className="loading loading-dots loading-sm"></span>
      </h3>
    </div>
  );
};

export default Spinner;
