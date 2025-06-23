import { Group, Pagination } from "@mantine/core";
import React, { FC, useMemo } from "react";
import { useListingFilterParams } from "../../hooks";
import { Listing } from "../../types";

type ListingsPaginationProps = {
  listings: Array<Listing>;
};

export const ListingsPagination: FC<ListingsPaginationProps> = ({
  listings,
}) => {
  const [{ page, pageSize }, setParams] = useListingFilterParams();
  const pages = useMemo(
    () => Math.ceil(listings.length / pageSize),
    [listings, pageSize]
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
