import { apiRequest } from "./apiClient";
import type { ApiResult } from "@/types/api";
import type {
  Product,
  ProductQueryParams,
  ProductResponse,
} from "@/types/product";

function transformProductResponse(item: ProductResponse): Product {
  return {
    id: item.id,
    name: item.title,
    category: item.category,
    price: Math.round(item.price * 100),
    rating: item.rating?.rate ?? 0,
    imageUrl: item.image,
    description: item.description,
  };
}

class ProductService {
  private readonly baseUrl = "https://fakestoreapi.com";

  /**
   * GET /products/categories - Directly returns ApiResult<string[]>
   */
  async getCategories(options?: RequestInit): Promise<ApiResult<string[]>> {
    return apiRequest<string[]>(`${this.baseUrl}/products/categories`, options);
  }

  /**
   * GET /products with client-side searching, filtering, and sorting
   * Returns ApiResult without throwing
   */
  async getProducts(
    params?: ProductQueryParams,
    options?: RequestInit
  ): Promise<ApiResult<{ products: Product[]; totalRecords: number }>> {
    const res = await apiRequest<ProductResponse[]>(
      `${this.baseUrl}/products`,
      options
    );

    if (!res.success) {
      return res;
    }

    let list = res.data.map(transformProductResponse);

    if (!params) {
      return {
        success: true,
        data: { products: list, totalRecords: list.length },
      };
    }

    // 1. Search filter
    if (params.search && params.search.trim() !== "") {
      const q = params.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category filter (direct string matching)
    if (params.category && params.category.trim() !== "") {
      const cat = params.category.trim().toLowerCase();
      list = list.filter((p) => p.category.toLowerCase() === cat);
    }

    // 3. Price range filter
    if (params.minPrice !== null && params.minPrice !== undefined) {
      list = list.filter((p) => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== null && params.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= params.maxPrice!);
    }

    // 4. Rating filter
    if (params.minRating !== null && params.minRating !== undefined) {
      list = list.filter((p) => p.rating >= params.minRating!);
    }

    // 5. Sorting
    if (params.sortBy) {
      const order = params.sortOrder === "desc" ? -1 : 1;
      list.sort((a, b) => {
        if (params.sortBy === "name") {
          return a.name.localeCompare(b.name) * order;
        }
        if (params.sortBy === "price") {
          return (a.price - b.price) * order;
        }
        if (params.sortBy === "rating") {
          return (a.rating - b.rating) * order;
        }
        return 0;
      });
    }

    return {
      success: true,
      data: {
        products: list,
        totalRecords: list.length,
      },
    };
  }

  /**
   * GET /products/:id - Returns ApiResult<Product>
   */
  async getProductById(
    id: number | string,
    options?: RequestInit
  ): Promise<ApiResult<Product>> {
    const res = await apiRequest<ProductResponse>(
      `${this.baseUrl}/products/${id}`,
      options
    );

    if (!res.success) {
      return res;
    }

    return {
      success: true,
      data: transformProductResponse(res.data),
    };
  }
}

export const productService = new ProductService();
