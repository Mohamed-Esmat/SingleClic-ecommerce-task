import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartButton = () => {
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleCartClick = () => {
    navigate("cart");
  };

  return (
    <button
      onClick={handleCartClick}
      className="
      flex items-center gap-2 
      bg-transparent border-2 border-[#1ad1b9] text-[#1ad1b9] 
      hover:text-white hover:bg-[#1ad1b9] 
      active:text-white active:bg-[#1ad1b9]
      px-4 py-2 rounded-lg
      transition-all duration-200 ease-in-out
      font-medium cursor-pointer
    "
    >
      <span>My Cart</span>
      <span
        className="
        bg-[#1ad1b9] text-[#1d1d1d] 
        rounded-full px-3 py-1 
        text-sm font-semibold
        min-w-[24px] text-center
      "
      >
        {totalQuantity}
      </span>
    </button>
  );
};

export default CartButton;
