import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartSummary = () => {
  const dispatch = useDispatch();
  const { totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(cartActions.clearCart());
    }
  };

  const handleCheckout = () => {
    alert("Checkout functionality will be implemented soon!");
  };

  // Calculate tax (8% for example)
  const taxRate = 0.08;
  const taxAmount = totalAmount * taxRate;
  const finalTotal = totalAmount + taxAmount;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Items Count */}
      <div className="flex justify-between items-center py-2 text-sm text-gray-600">
        <span>Items ({totalQuantity})</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center py-2 text-sm text-gray-600">
        <span>Tax</span>
        <span>${taxAmount.toFixed(2)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center py-2 text-sm text-gray-600">
        <span>Shipping</span>
        <span className="text-green-600 font-medium">Free</span>
      </div>

      <hr className="my-4" />

      {/* Total */}
      <div className="flex justify-between items-center py-2 text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-6">
        <button
          onClick={handleCheckout}
          disabled={totalQuantity === 0}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Proceed to Checkout
        </button>

        {totalQuantity > 0 && (
          <button
            onClick={handleClearCart}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Promotional Message */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center text-green-800">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">
            Free shipping on all orders!
          </span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center text-gray-500 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secure checkout
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
