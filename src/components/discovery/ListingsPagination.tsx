import { Group, Pagination } from "@mantine/core";
import React, { FC, useMemo } from "react";
import { useListingFilterParams, useListings } from "../../hooks";
import { Listing } from "../../types";

type ListingsPaginationProps = {};

export const ListingsPagination: FC<ListingsPaginationProps> = ({}) => {
  const [params, setParams] = useListingFilterParams();
  const { totalCount } = useListings(params);
  const { page, pageSize } = params;

  const pages = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );
  return (
    <>
      {pages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            value={page}
            onChange={(newPage) => setParams({ page: newPage })}
            total={pages}
            size="md"
            withEdges
          />
        </Group>
      )}
    </>
  );
};
