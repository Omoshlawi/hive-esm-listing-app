import { searchParamUtils, useTypedSearchParams } from "@hive/esm-core-api";
import { ListingFilterParams } from "../types";

export const useListingFilterParams = () => {
  const params = useTypedSearchParams<ListingFilterParams>({
    page: {
      parse: (value) => searchParamUtils.parseNumber(value, 1),
      serialize: (value) => String(value),
      defaultValue: 1,
    },
    pageSize: {
      parse: (value) => searchParamUtils.parseNumber(value, 12),
      serialize: (value) => String(value),
      defaultValue: 12,
    },
    search: {
      parse: (value) => value || "",
      serialize: (value) => value,
      defaultValue: "",
    },
    isActive: {
      parse: (value) => searchParamUtils.parseBoolean(value, false),
      serialize: (value) => String(value),
      defaultValue: false,
    },
    tags: {
      parse: (value) => searchParamUtils.parseArray(value, []),
      serialize: (value) => searchParamUtils.serializeArray(value),
      defaultValue: [],
    },
    sortBy: {
      parse: (value) => {
        const validSorts = [
          "newest",
          "oldest",
          "price-low",
          "price-high",
          "views",
        ] as const;
        return validSorts.includes(value as any)
          ? (value as ListingFilterParams["sortBy"])
          : "newest";
      },
      serialize: (value) => value,
      defaultValue: "newest" as const,
    },
    view: {
      parse: (value) => value || ("grid" as any),
      serialize: (value) => value,
      defaultValue: "grid",
    },
    types: {
      parse: (value) => {
        const validTypes = [
          "RENTAL",
          "SALE",
          "LEASE",
          "AUCTION",
          "RENT_TO_OWN",
          "SHORT_TERM",
          "CO_LIVING",
        ] as const;
        const types = searchParamUtils.parseArray(value || "", []);
        return validTypes.some((vt) => types.includes(vt))
          ? (types as ListingFilterParams["types"])
          : undefined;
      },
      serialize: (value) => searchParamUtils.serializeArray(value),
      defaultValue: undefined,
    },
  });
  return params;
};
