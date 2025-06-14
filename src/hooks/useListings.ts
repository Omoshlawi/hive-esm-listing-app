import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { Listing, ListingMedia } from "../types";
import useSWR from "swr";

export const useListings = () => {
  const url = constructUrl("/listings");
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<Listing> }>>(url);
  return {
    listings: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useListing = (listingId: string) => {
  const url = `/listings/${listingId}`;
  const { data, isValidating, ...props } = useSWR<APIFetchResponse<Listing>>(
    listingId ? url : null
  );
  return {
    ...props,
    listing: data?.data,
  };
};

export const useListingMedia = (listingId: string) => {
  const url = `/listings/${listingId}/media`;
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<{ results: Array<ListingMedia> }>>(url);
  return {
    isLoading,
    error,
    media: data?.data?.results ?? [],
  };
};
