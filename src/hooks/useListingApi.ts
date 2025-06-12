import { apiFetch, constructUrl } from "@hive/esm-core-api";
import { Listing, ListingFormData, Property } from "../types";

const addListing = async (data: ListingFormData) => {
  return await apiFetch<Listing>("/listings", { method: "POST", data });
};

const updateListing = async (
  listingId: string,
  data: ListingFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await apiFetch<Listing>(`/listings/${listingId}`, {
    method: method,
    data,
  });
};

const deleteListing = async (
  listingId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await apiFetch<Listing>(`/listings/${listingId}`, {
    method: method,
  });
};

const searchProperty = (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  return apiFetch<{ results: Array<Property> }>(url);
};

export const useListingApi = () => {
  return {
    addListing,
    updateListing,
    deleteListing,
    searchProperty,
  };
};
