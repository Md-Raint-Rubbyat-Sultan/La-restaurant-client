import PropTypes from "prop-types";

const PopularFoodCards = ({ food }) => {
  const { name, category, img, price } = food;
  return (
    <div className="overflow-hidden bg-base-100 shadow-xl border-2 border-gray-300 rounded-lg">
      <figure>
        <img className="w-full h-56 md:h-72 lg:h-80" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <div className="card-actions justify-center">
          <button className="btn-card mt-10 px-6 py-2">Details</button>
        </div>
      </div>
    </div>
  );
};

PopularFoodCards.propTypes = {
  food: PropTypes.object.isRequired,
};

export default PopularFoodCards;
