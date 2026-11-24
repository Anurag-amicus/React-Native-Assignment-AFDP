import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/layout/SearchBar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";
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

  // Loading, error, and refresh states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

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

  // Load Categories directly from API on mount with AbortController cleanup
  useEffect(() => {
    const controller = new AbortController();
    productService
      .getCategories({ signal: controller.signal })
      .then((res) => {
        if (res.success) {
          setCategories(res.data);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  // Fetch / Filter products whenever any query param or retry trigger changes
  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    Promise.resolve().then(() => {
      if (isCurrent && !refreshing) {
        setLoading(true);
        setError(null);
      }
    });

    productService
      .getProducts(
        {
          search: searchQuery,
          category: selectedCategory,
          minPrice: selectedPriceRange?.min,
          maxPrice: selectedPriceRange?.max,
          minRating: selectedRating,
          sortBy: selectedSort,
          sortOrder: selectedDirection,
        },
        { signal: controller.signal }
      )
      .then((res) => {
        if (!isCurrent) return;
        if (res.success) {
          setProducts(res.data.products);
          setTotalRecords(res.data.totalRecords);
          setError(null);
        } else if (res.status !== 499) {
          // Status 499 is abort, only set error for real failures
          setError(res.error || "Failed to load products. Please check your connection.");
        }
      })
      .catch(() => {
        if (!isCurrent) return;
        setError("An unexpected network error occurred.");
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    selectedSort,
    selectedDirection,
    retryKey,
    refreshing,
  ]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRetryKey((prev) => prev + 1);
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryKey((prev) => prev + 1);
  };

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
        placeholder="Search products, categories..."
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
      {!loading && !error && (
        <ProductCountBar
          currentCount={products.length}
          totalCount={totalRecords}
          searchQuery={searchQuery}
          sortBy={selectedSort}
          sortOrder={selectedDirection}
        />
      )}
    </View>
  );

  const renderEmpty = () => {
    if (loading && !refreshing) {
      return <ProductGridSkeleton count={6} />;
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <View style={styles.errorIconCircle}>
            <Ionicons name="alert-circle-outline" size={44} color="#ef4444" />
          </View>
          <Text style={styles.errorTitle}>Failed to Load Products</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color={colors.white} />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="search-outline" size={36} color={colors.muted} />
        </View>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>
          Try changing your search terms or resetting filters.
        </Text>
        {(searchQuery ||
          selectedCategory ||
          selectedPriceRange ||
          selectedRating ||
          selectedSort) && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetAllFilters}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 2-Column Virtualized Product Grid with Pull-to-Refresh */}
      <FlatList
        data={loading && !refreshing ? [] : products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={products.length > 0 && !(loading && !refreshing) ? styles.row : undefined}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.orange}
            colors={[colors.orange]}
          />
        }
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
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
    marginBottom: 16,
  },
  resetButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.orangeLight,
    borderWidth: 1,
    borderColor: colors.orange,
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.orange,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 44,
    paddingHorizontal: 24,
  },
  errorIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.charcoal,
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 18,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: colors.orange,
  },
  retryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
});
