import { APIFetchResponse } from "@hive/esm-core-api";
import useSWR from "swr";
import { FinancingOption } from "../types";

export const useFinancingOptions = () => {
  const url = "/financing-options";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FinancingOption> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};
