import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/layout/SearchBar";
import { ProductCard } from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/filters/FilterSidebar";
import ProductCountBar from "@/components/products/ProductCountBar";
import { productService } from "@/services/productService";
import type { BrandItem, CategoryItem, Product } from "@/types/product";
import type { PriceRange, SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ categoryId?: string; search?: string }>();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filter & Search states
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(params.search ?? "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    params.categoryId ? Number(params.categoryId) : null
  );
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<SortDirection>("asc");

  // Sync params when navigated with new params
  useEffect(() => {
    if (params.categoryId) {
      setSelectedCategoryId(Number(params.categoryId));
    }
    if (params.search !== undefined) {
      setSearchQuery(params.search);
    }
  }, [params.categoryId, params.search]);

  // Load Categories & Brands on mount
  useEffect(() => {
    productService.getCategories().then(setCategories);
    productService.getBrands().then(setBrands);
  }, []);

  // Fetch / Filter products whenever any query param changes
  useEffect(() => {
    productService
      .getProducts({
        search: searchQuery,
        categoryId: selectedCategoryId,
        brandId: selectedBrandId,
        minPrice: selectedPriceRange?.min,
        maxPrice: selectedPriceRange?.max,
        minRating: selectedRating,
        sortBy: selectedSort,
        sortOrder: selectedDirection,
      })
      .then((res) => {
        setProducts(res.products);
        setTotalRecords(res.totalRecords);
      });
  }, [
    searchQuery,
    selectedCategoryId,
    selectedBrandId,
    selectedPriceRange,
    selectedRating,
    selectedSort,
    selectedDirection,
  ]);

  const handleClearSort = () => {
    setSelectedSort(null);
    setSelectedDirection(null);
  };

  const renderHeader = () => (
    <View style={styles.headerControls}>
      {/* 1. Live Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products..."
      />

      {/* 2. Collapsible Filter Accordion */}
      <FilterSidebar
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen((prev) => !prev)}
        categories={categories}
        brands={brands}
        selectedCategoryId={selectedCategoryId}
        selectedBrandId={selectedBrandId}
        selectedPriceRange={selectedPriceRange}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        selectedDirection={selectedDirection}
        onCategoryChange={setSelectedCategoryId}
        onBrandChange={setSelectedBrandId}
        onPriceChange={setSelectedPriceRange}
        onRatingChange={setSelectedRating}
        onSortChange={(sort) => {
          setSelectedSort(sort);
          if (!selectedDirection) setSelectedDirection("asc");
        }}
        onDirectionChange={setSelectedDirection}
        onClearSort={handleClearSort}
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
    paddingVertical: 48,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginVertical: 12,
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

