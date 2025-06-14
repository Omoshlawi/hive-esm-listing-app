import { APIFetchResponse } from "@hive/esm-core-api";
import useSWR from "swr";
import { FinancingOptions } from "../types";

export const usefinancingOptions = () => {
  const url = "/financing-options";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FinancingOptions> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};
