export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
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
