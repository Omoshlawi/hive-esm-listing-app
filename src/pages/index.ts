import { withUserAccess } from "@hive/esm-core-components";
import ListingsPage from "./ListingsPage";

export const Listings = withUserAccess(ListingsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
