import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/layout/SearchBar";
import { ProductCard } from "@/components/products/ProductCard";
import FilterChipBar from "@/components/products/filters/FilterChipBar";
import FilterBottomSheet from "@/components/products/filters/FilterBottomSheet";
import ProductCountBar from "@/components/products/ProductCountBar";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import type { PriceRange, SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ category?: string; search?: string }>();

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filter & Search states
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(params.search ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    params.category ?? null
  );
  const [prevCategoryParam, setPrevCategoryParam] = useState(params.category);
  const [prevSearchParam, setPrevSearchParam] = useState(params.search);

  if (params.category !== prevCategoryParam) {
    setPrevCategoryParam(params.category);
    setSelectedCategory(params.category ?? null);
  }
  if (params.search !== prevSearchParam) {
    setPrevSearchParam(params.search);
    setSearchQuery(params.search ?? "");
  }

  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<SortDirection>("asc");

  // Load Categories directly from API on mount
  useEffect(() => {
    productService.getCategories().then((res) => {
      if (res.success) {
        setCategories(res.data);
      }
    });
  }, []);

  // Fetch / Filter products whenever any query param changes
  useEffect(() => {
    productService
      .getProducts({
        search: searchQuery,
        category: selectedCategory,
        minPrice: selectedPriceRange?.min,
        maxPrice: selectedPriceRange?.max,
        minRating: selectedRating,
        sortBy: selectedSort,
        sortOrder: selectedDirection,
      })
      .then((res) => {
        if (res.success) {
          setProducts(res.data.products);
          setTotalRecords(res.data.totalRecords);
        }
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    selectedSort,
    selectedDirection,
  ]);

  const handleClearSort = () => {
    setSelectedSort(null);
    setSelectedDirection(null);
  };

  const handleResetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSelectedSort(null);
    setSelectedDirection(null);
  };

  const renderHeader = () => (
    <View style={styles.headerControls}>
      {/* 1. Live Search Bar (Floating Bubble Pill) */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products, brands, categories..."
      />

      {/* 2. Horizontal Filter Chips Bar */}
      <FilterChipBar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedPriceRange={selectedPriceRange}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onOpenFilter={() => setFiltersOpen(true)}
        onClearAll={handleResetAllFilters}
      />

      {/* 3. Dynamic Results Count & Sorting Status Bar */}
      <ProductCountBar
        currentCount={products.length}
        totalCount={totalRecords}
        searchQuery={searchQuery}
        sortBy={selectedSort}
        sortOrder={selectedDirection}
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        Try changing your search or filters.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 2-Column Virtualized Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        bounces={false}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard {...item} />
          </View>
        )}
      />

      {/* Native Bottom Sheet Filter Modal */}
      <FilterBottomSheet
        visible={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedPriceRange={selectedPriceRange}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        selectedDirection={selectedDirection}
        onCategoryChange={setSelectedCategory}
        onPriceChange={setSelectedPriceRange}
        onRatingChange={setSelectedRating}
        onSortChange={(sort) => {
          setSelectedSort(sort);
          if (!selectedDirection) setSelectedDirection("asc");
        }}
        onDirectionChange={setSelectedDirection}
        onClearSort={handleClearSort}
        onResetAll={handleResetAllFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerControls: {
    width: "100%",
    marginBottom: 4,
  },
  row: {
    justifyContent: "space-between",
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: "48.5%",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.charcoal,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
  },
});
