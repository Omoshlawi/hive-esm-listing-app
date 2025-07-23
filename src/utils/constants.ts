export const INPUT_ORDER: ("description" | "input" | "label" | "error")[] = [
  "label",
  "input",
  "description",
  "error",
];

export const LISTING_TYPES = [
  { label: "Rental", value: "RENTAL" },
  { label: "Sale", value: "SALE" },
  { label: "Lease", value: "LEASE" },
  { label: "Auction", value: "AUCTION" },
  // { label: "Rent to Own", value: "RENT_TO_OWN" },
  // { label: "Short Term", value: "SHORT_TERM" },
  // { label: "Co-Living", value: "CO_LIVING" },
];

export const PAGE_SIZES = [
  { label: "12", value: "12" },
  { label: "24", value: "24" },
  { label: "60", value: "60" },
  { label: "120", value: "120" },
];
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "views", label: "Most Viewed" },
];
