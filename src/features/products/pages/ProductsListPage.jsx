import { useSearchParams } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import { useFilteredProducts } from "../hooks/useProducts";
import ProductPagination from "../components/ProducPagination";
import ProductsGrid from "../components/ProductsGrid";

const ProductsListPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 8;

  const {
    products,
    isLoading,
    isError,
    error,
    totalPages,
    currentPage,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = useFilteredProducts({ category, search, page, limit });
  return (
    <div className="space-y-6">
      {/* filters */}
      <ProductFilters />

      {/* products list */}
      <ProductsGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {/* pagination */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        totalItems={totalItems}
        itemsPerPage={limit}
      />
    </div>
  );
};

export default ProductsListPage;
