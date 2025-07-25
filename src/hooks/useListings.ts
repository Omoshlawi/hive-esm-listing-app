import {
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  useSession,
} from "@hive/esm-core-api";
import { Listing, ListingMedia } from "../types";
import useSWR from "swr";
import { useDebouncedValue } from "@mantine/hooks";

export const useListings = (params: Record<string, any> = {}) => {
  const { currentOrganization } = useSession();
  const [debounced] = useDebouncedValue(params, 500);
  const url = constructUrl("/listings", {
    ...debounced,
    context: currentOrganization,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<APIListResponse<Listing>>>(url);
  return {
    listings: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
    totalCount: data?.data?.totalCount ?? 0,
  };
};

export const useListing = (listingId: string) => {
  const url = constructUrl(`/listings/${listingId}`, {
    v: "custom:include(saleDetails:include(ownershipType,financingOptions),rentalDetails,leaseDetails,auctionDetails,shortTermDetails,rentToOwnDetails,coLivingDetails)",
  });
  const { data, isValidating, ...props } = useSWR<APIFetchResponse<Listing>>(
    listingId ? url : null
  );
  return {
    ...props,
    listing: data?.data,
  };
};

export const useListingMedia = (
  listingId: string,
  mediaType?: ListingMedia["mediaType"]
) => {
  const url = constructUrl(`/listings/${listingId}/media`, { mediaType });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<{ results: Array<ListingMedia> }>>(url);
  return {
    isLoading,
    error,
    media: data?.data?.results ?? [],
  };
};
