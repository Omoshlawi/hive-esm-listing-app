import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { useState } from "react";
import useSWR from "swr";
import { Property } from "../types";
import { useDebouncedValue } from "@mantine/hooks";

export const useSearchProperties = () => {
  const [search, setSearch] = useState<string>("");
  const [debounced] = useDebouncedValue(search, 500);

  const url = constructUrl(`/properties`, { search: debounced });

  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Property> }>
  >(search ? url : null);
  return {
    isLoading,
    error,
    properties: data?.data?.results ?? [],
    setSearch,
    search,
  };
};
