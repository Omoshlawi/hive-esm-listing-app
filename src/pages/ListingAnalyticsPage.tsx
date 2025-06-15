import React from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../hooks";
import { Container, Stack } from "@mantine/core";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import AnaliticsGrid from "../components/AnaliticsGrid";

const ListingAnalyticsPage = () => {
  const { listingId } = useParams<{
    listingId: string;
  }>();
  const { error, isLoading, listing } = useListing(listingId);
  if (isLoading || error || !listing) return null;

  return (
    <Container size="100%" px={0}>
      <Stack gap="xl">
        <AnalyticsOverview listing={listing} />
        <AnaliticsGrid />
      </Stack>
    </Container>
  );
};

export default ListingAnalyticsPage;
