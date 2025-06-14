import { apiFetch, constructUrl, mutate } from "@hive/esm-core-api";
import {
  Listing,
  ListingFormData,
  ListingMedia,
  ListingMediaFormData,
  ListingStatus,
  Property,
} from "../types";

const addListing = async (data: ListingFormData) => {
  const res = await apiFetch<Listing>("/listings", { method: "POST", data });
  return res.data;
};

const updateListing = async (
  listingId: string,
  data: ListingFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Listing>(`/listings/${listingId}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteListing = async (
  listingId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<Listing>(`/listings/${listingId}`, {
    method: method,
  });
  return res.data;
};

const addListingMedia = async (
  listingId: string,
  data: ListingMediaFormData
) => {
  const res = await apiFetch<ListingMedia>(`/listings/${listingId}/media`, {
    method: "POST",
    data,
  });
  return res.data;
};
const updateListingMedia = async (
  listingId: string,
  mediaId: string,
  data: ListingMediaFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<ListingMedia>(
    `/listings/${listingId}/media/${mediaId}`,
    {
      method: method,
      data,
    }
  );
  return res.data;
};
const deleteListingMedia = async (
  listingId: string,
  mediaId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<ListingMedia>(
    `/listings/${listingId}/media/${mediaId}`,
    {
      method: method,
    }
  );
  return res.data;
};

const searchProperty = (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  return apiFetch<{ results: Array<Property> }>(url);
};

const submitDraftListingForReview = async (listingId: string) => {
  const res = await apiFetch<ListingStatus>(
    `/listings/${listingId}/status/submit`,
    {
      method: "POST",
    }
  );
  return res.data;
};

const approvePendingListing = async (listingId: string) => {
  const res = await apiFetch<ListingStatus>(
    `/listings/${listingId}/status/approve`,
    {
      method: "POST",
    }
  );
  return res.data;
};
export const useListingApi = () => {
  return {
    addListing,
    updateListing,
    deleteListing,
    searchProperty,
    addListingMedia,
    updateListingMedia,
    deleteListingMedia,
    submitDraftListingForReview,
    approvePendingListing,
    mutateListings: () => mutate("/listings"),
  };
};
