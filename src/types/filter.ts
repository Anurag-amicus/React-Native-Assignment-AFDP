export type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
};

export type SortOption = "name" | "price" | "rating";

export type SortDirection = "asc" | "desc" | null;

export type SortFilterProps = {
  selectedSort: SortOption | null;
  selectedDirection: SortDirection;
  onSortChange: (sort: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
  onClearSort: () => void;
};
