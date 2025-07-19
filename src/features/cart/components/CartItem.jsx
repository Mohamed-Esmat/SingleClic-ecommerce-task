import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartItem = ({ item }) => {
  console.log("CartItem rendered:", item);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  const handleRemove = () => {
    dispatch(cartActions.removeEntireItem(item.id));
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Product Image & Info */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
          <p className="text-lg font-bold text-indigo-600 mt-1">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center font-medium text-lg">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[80px]">
          <p className="text-lg font-bold text-gray-900">
            ${item.totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
