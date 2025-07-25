import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { useState } from "react";
import useSWR from "swr";
import { Property } from "../types";
import { useDebouncedValue } from "@mantine/hooks";

export const useSearchProperties = () => {
  const [search, searchProperty] = useState<string>("");
  const [debounced] = useDebouncedValue(search, 500);

  const url = constructUrl(`/properties`, {
    search: debounced,
    status: "APPROVED",
  });

  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Property> }>
  >(debounced ? url : null);
  return {
    isLoading,
    error,
    properties: data?.data?.results ?? [],
    searchProperty,
    search,
  };
};

export const useProperty = (id: string) => {
  const path = constructUrl(`/properties/${id}`, {
    v: "custom:include(categories:include(category),amenities:include(amenity),attributes:include(attribute))",
  });

  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<Property>>(path);
  return {
    property: data?.data,
    isLoading,
    error,
    mutate,
  };
};
