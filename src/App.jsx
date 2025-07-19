import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./app/store";
import { queryClient } from "./app/queryClient";
import {
  fetchCartData,
  sendCartData,
} from "./features/cart/store/cart-actions";

let isInitial = true;

function AppContent() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // Load cart from API on app start
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return <AppRouter />;
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
