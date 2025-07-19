import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/productService";

// export const productKeys = {
//   all: ["products"],
//   lists: () => [...productKeys.all, "list"],
//   list: (filters) => [...productKeys.lists(), filters],
//   details: () => [...productKeys.all, "detail"],
//   detail: (id) => [...productKeys.details(), id],
//   categories: () => [...productKeys.all, "categories"],
// };

export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    ...options,
  });
};

export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getProductById(id),
    ...options,
  });
};

export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: productService.getCategories,
    ...options,
  });
};

// Hook for filtering products by category and search term and pagination
export const useFilteredProducts = ({
  category,
  search,
  page = 1,
  limit = 8,
}) => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts({ keepPreviousData: true });

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category === category; // Optional category filter
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()); // Optional search filter
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure page is within bounds

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    isLoading,
    isError,
    error,
    totalPages,
    currentPage,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
