import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { Listing } from "../types";
import useSWR from "swr";

const useListings = () => {
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

export default useListings;
