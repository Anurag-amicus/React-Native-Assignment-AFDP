export interface Product {
  id: number;
  name: string;
  category: string;
  categoryId?: number;
  price: number;
  rating: number;
  imageUrl: string;
  brandName?: string;
  brandId?: number;
  description?: string;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export type CategoryResponse = CategoryItem[];

export interface BrandItem {
  brandId: number;
  name: string;
}

export type BrandResponse = BrandItem[];

export interface ProductQueryParams {
  search?: string;
  categoryId?: number | null;
  brandId?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minRating?: number | null;
  sortBy?: "name" | "price" | "rating" | null;
  sortOrder?: "asc" | "desc" | null;
  page?: number;
  pageSize?: number;
}
