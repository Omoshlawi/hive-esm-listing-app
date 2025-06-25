import { withUserAccess } from "@hive/esm-core-components";
import ListingsPage from "./ListingsPage";
import ListingDetailPage from "./ListingDetailPage";
import PropertyListingsPage from "./PropertyListingsPage";
import ListingGalaryPage from "./ListingGalaryPage";
import ListingAnalyticsPage from "./ListingAnalyticsPage";

export const Listings = withUserAccess(ListingsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});

export const ListingDetail = withUserAccess(ListingDetailPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});

export const PropertyListings = withUserAccess(PropertyListingsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const ListingGalary = withUserAccess(ListingGalaryPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const ListingAnalytics = withUserAccess(ListingAnalyticsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});

export { default as PublicListings } from "./PublicListingsPage";
export { default as PublicListingDetail } from "./PublicListingDetailPage";
