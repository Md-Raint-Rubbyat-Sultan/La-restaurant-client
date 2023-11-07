import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyAddedFoodCards = ({ addedFood, handelFoodDelete }) => {
  const { _id, name, category, img, price, quantity } = addedFood;

  return (
    <div className="overflow-hidden bg-base-100 shadow-xl border-2 border-gray-300 rounded-lg">
      <figure>
        <img className="w-full h-56 md:h-72 lg:h-80" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <p>Quantity: {quantity}</p>
        <div className="card-actions justify-center">
          <Link to={`/user/added-foods/update/${_id}`}>
            <button className="btn-card mt-10 px-6 py-2">Update</button>
          </Link>
          <button
            onClick={() => handelFoodDelete(_id)}
            className="btn-card mt-10 px-6 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

MyAddedFoodCards.propTypes = {
  addedFood: PropTypes.object.isRequired,
  handelFoodDelete: PropTypes.func,
};

export default MyAddedFoodCards;
