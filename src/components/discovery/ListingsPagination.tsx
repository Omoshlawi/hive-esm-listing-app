import React, { FC } from "react";
import { Listing } from "../../types";

type ListingsPaginationProps = {
  listings: Array<Listing>;
};

export const ListingsPagination: FC<ListingsPaginationProps> = ({
  listings,
}) => {
  return (
    <div>
      {/* {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            size="md"
            withEdges
          />
        </Group>
      )} */}
    </div>
  );
};
