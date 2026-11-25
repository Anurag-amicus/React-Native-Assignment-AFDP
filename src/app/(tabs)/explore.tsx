import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchBar from "@/components/layout/SearchBar";
import FilterSortBar from "@/components/products/filters/FilterSortBar";
import FilterBottomSheet from "@/components/products/filters/FilterBottomSheet";
import SortBottomSheet from "@/components/products/filters/SortBottomSheet";
import ProductCountBar from "@/components/products/ProductCountBar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";
import ErrorView from "@/components/common/ErrorView";
import { productService } from "@/services/productService";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types/product";
import type { SortDirection, SortOption } from "@/types/filter";
import { colors } from "@/theme/colors";

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; search?: string }>();

  // Master product catalog & categories from API
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Loading, error, and refresh states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Modals state
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Search input state with 300ms debounce
  const [searchQuery, setSearchQuery] = useState(params.search ?? "");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Category filter is driven directly by params.category (source of truth)
  const selectedCategory = params.category ?? null;

  // Sorting state
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<SortDirection>("asc");

  // Load Categories & Products on mount / refresh
  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    async function fetchData() {
      try {
        if (!refreshing) {
          setLoading(true);
        }
        setError(null);

        const [catRes, prodRes] = await Promise.all([
          productService.getCategories({ signal: controller.signal }),
          productService.getProducts(undefined, { signal: controller.signal }),
        ]);

        if (!isCurrent) return;

        if (catRes.success) {
          setCategories(catRes.data);
        }

        if (prodRes.success) {
          setAllProducts(prodRes.data.products);
          setError(null);
        } else if (prodRes.status !== 499) {
          setError(prodRes.error || "Failed to load products. Please check your connection.");
        }
      } catch (err) {
        if (isCurrent && !(err instanceof Error && err.name === "AbortError")) {
          setError("An unexpected network error occurred.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    fetchData();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [retryKey, refreshing]);

  // Combined In-Memory Filter & Sort 
  const filteredProducts = useMemo(() => {
    let list = allProducts;

    // 1. Search Filter (debounced)
    if (debouncedSearch && debouncedSearch.trim() !== "") {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory.trim() !== "") {
      const cat = selectedCategory.trim().toLowerCase();
      list = list.filter((p) => p.category.toLowerCase() === cat);
    }

    // 3. Sorting Options
    if (selectedSort) {
      list = [...list].sort((a, b) => {
        if (selectedSort === "name") {
          const cmp = a.name.localeCompare(b.name);
          return selectedDirection === "desc" ? -cmp : cmp;
        }
        if (selectedSort === "price") {
          return selectedDirection === "desc"
            ? b.price - a.price
            : a.price - b.price;
        }
        if (selectedSort === "rating") {
          return selectedDirection === "desc"
            ? b.rating - a.rating
            : a.rating - b.rating;
        }
        return 0;
      });
    }

    return list;
  }, [allProducts, debouncedSearch, selectedCategory, selectedSort, selectedDirection]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRetryKey((prev) => prev + 1);
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryKey((prev) => prev + 1);
  };

  const handleCategorySelect = (category: string | null) => {
    router.setParams({ category: category || undefined });
  };

  const handleResetCategory = () => {
    router.setParams({ category: undefined });
  };

  const handleClearSort = () => {
    setSelectedSort(null);
    setSelectedDirection("asc");
  };

  const handleResetAllFilters = () => {
    setSearchQuery("");
    setSelectedSort(null);
    setSelectedDirection("asc");
    router.setParams({ category: undefined, search: undefined });
  };

  const renderHeader = () => (
    <View style={styles.headerControls}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products, categories..."
      />

      <FilterSortBar
        hasActiveFilter={selectedCategory !== null}
        hasActiveSort={selectedSort !== null}
        onPressFilter={() => setFilterOpen(true)}
        onPressSort={() => setSortOpen(true)}
      />

      {!loading && !error && (
        <ProductCountBar
          currentCount={filteredProducts.length}
          totalCount={allProducts.length}
          searchQuery={debouncedSearch}
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
      return <ErrorView message="Please try again later." onRetry={handleRetry} />;
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="search-outline" size={36} color={colors.muted} />
        </View>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>
          {"We couldn't find anything matching your search and filter criteria."}
        </Text>
        {(searchQuery || selectedCategory || selectedSort) && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetAllFilters}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Reset All Filters</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={loading && !refreshing ? [] : filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={Platform.OS === "android"}
        columnWrapperStyle={
          filteredProducts.length > 0 && !(loading && !refreshing)
            ? styles.row
            : undefined
        }
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

      <FilterBottomSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategorySelect}
        onReset={handleResetCategory}
      />

      <SortBottomSheet
        visible={sortOpen}
        onClose={() => setSortOpen(false)}
        selectedSort={selectedSort}
        selectedDirection={selectedDirection}
        onSortChange={(sort) => {
          setSelectedSort(sort);
          if (!selectedDirection) setSelectedDirection("asc");
        }}
        onDirectionChange={setSelectedDirection}
        onClearSort={handleClearSort}
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
    lineHeight: 18,
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
});
