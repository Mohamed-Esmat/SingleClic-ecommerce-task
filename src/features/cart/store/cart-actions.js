import { cartActions } from "./cart-slice";

// Fetch cart data from API
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxcart0452-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Error fetching the cart data!");
      }

      const data = await response.json();
      if (!data) {
        return {
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        };
      }
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity || 0,
          totalAmount: data.totalAmount || 0,
        })
      );
    } catch (error) {
      console.error("Error fetching cart data:", error);
      // If there's an error, start with empty cart
      dispatch(
        cartActions.replaceCart({
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        })
      );
    }
  };
};

// Send cart data to API
export const sendCartData = (cart) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxcart0452-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      console.log("Cart data saved successfully");
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  };
};
