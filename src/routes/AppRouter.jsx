import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import Layout from "../shared/components/Layout";
import ProductsListPage from "../features/products/pages/ProductsListPage";
import CartPage from "../features/cart/pages/CartPage";
import NotFoundPage from "../shared/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" />,
    errorElement: <div>Page not found</div>,
  },
  {
    path: "/products",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsListPage />,
        // loader: productsLoader,
      },
      {
        path: "product/:productId",
        element: <ProductDetailsPage />,
        // loader: productDetailsLoader,
        // errorElement: <ProductErrorPage />
      },
      //   {
      //     path: "category/:categoryName",
      //     element: <CategoryPage />,
      //     // loader: categoryLoader,
      //   },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
