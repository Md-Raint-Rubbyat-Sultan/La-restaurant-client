import PropTypes from "prop-types";

const CartCards = ({ order, handelCartFoodDelete }) => {
  const { _id, name, category, img, price, addedQuantity, addedTime } = order;
  return (
    <div className="overflow-hidden bg-base-100 shadow-xl border-2 border-gray-300 rounded-lg">
      <figure>
        <img className="w-full h-56 md:h-72 lg:h-80" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <p>Quantity: {addedQuantity}</p>
        <p>Ordered: {addedTime}</p>
        <div className="card-actions justify-center">
          <button
            onClick={() => handelCartFoodDelete(_id)}
            className="btn-card mt-10 px-6 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CartCards.propTypes = {
  order: PropTypes.object.isRequired,
  extra: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  handelCartFoodDelete: PropTypes.func,
};

export default CartCards;
