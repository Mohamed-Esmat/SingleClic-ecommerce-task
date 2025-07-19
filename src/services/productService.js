import api from "./api";

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products: " + error);
    }
  },
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch product: " + error);
    }
  },

  // Get categories from the products
  getCategories: async () => {
    try {
      const response = await api.get("/products");
      const products = response.data;
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];
      return categories;
    } catch (error) {
      throw new Error("Failed to fetch categories: " + error);
    }
  },
};
