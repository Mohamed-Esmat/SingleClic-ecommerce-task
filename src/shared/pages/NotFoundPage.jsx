import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/images/404_page-not-found.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Image */}
        <div className="mb-8">
          <img
            src={notFoundImage}
            alt="Page Not Found"
            className="w-full max-w-sm mx-auto h-auto"
          />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Homepage
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? You can browse our{" "}
            <button
              onClick={() => navigate("/products")}
              className="text-indigo-600 hover:text-indigo-800 underline focus:outline-none"
            >
              products
            </button>{" "}
            or check your{" "}
            <button
              onClick={() => navigate("/cart")}
              className="text-indigo-600 hover:text-indigo-800 underline focus:outline-none"
            >
              shopping cart
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
