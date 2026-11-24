import type {
  BrandItem,
  CategoryItem,
  Product,
  ProductQueryParams,
} from "@/types/product";
import rawProducts from "../data/products.json";

export const MOCK_CATEGORIES: CategoryItem[] = [
  { categoryId: 1, name: "Electronics" },
  { categoryId: 2, name: "Fashion" },
  { categoryId: 3, name: "Home" },
  { categoryId: 4, name: "Footwear" },
  { categoryId: 5, name: "Accessories" },
];

export const MOCK_BRANDS: BrandItem[] = [
  { brandId: 1, name: "Sony" },
  { brandId: 2, name: "Apple" },
  { brandId: 3, name: "Nike" },
  { brandId: 4, name: "Puma" },
  { brandId: 5, name: "Casio" },
  { brandId: 6, name: "Logitech" },
  { brandId: 7, name: "Ray-Ban" },
  { brandId: 8, name: "Woodland" },
];

const PRODUCTS: Product[] = rawProducts;

class ProductService {
  /**
   * GET /api/Categories
   */
  async getCategories(): Promise<CategoryItem[]> {
    return Promise.resolve(MOCK_CATEGORIES);
  }

  /**
   * GET /api/Brands
   */
  async getBrands(): Promise<BrandItem[]> {
    return Promise.resolve(MOCK_BRANDS);
  }

  /**
   * GET /api/v1/Products/search with search, filters, and sort
   */
  async getProducts(params?: ProductQueryParams): Promise<{
    products: Product[];
    totalRecords: number;
  }> {
    let list = [...PRODUCTS];

    if (!params) {
      return Promise.resolve({ products: list, totalRecords: list.length });
    }

    // 1. Search Query filter
    if (params.search && params.search.trim() !== "") {
      const q = params.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 4. Price range filter
    if (params.minPrice !== null && params.minPrice !== undefined) {
      list = list.filter((p) => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== null && params.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= params.maxPrice!);
    }

    // 5. Rating filter
    if (params.minRating !== null && params.minRating !== undefined) {
      list = list.filter((p) => p.rating >= params.minRating!);
    }

    // 6. Sorting
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

    return Promise.resolve({
      products: list,
      totalRecords: list.length,
    });
  }
}

export const productService = new ProductService();
