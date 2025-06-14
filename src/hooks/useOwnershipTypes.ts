import { APIFetchResponse } from "@hive/esm-core-api";
import useSWR from "swr";
import { OwnershipType } from "../types";

export const useOwnershipTypes = () => {
  const url = "/ownership-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<OwnershipType> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};
