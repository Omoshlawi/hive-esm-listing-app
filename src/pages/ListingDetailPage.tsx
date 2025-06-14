import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../hooks";
import {
  MainDashboardTabs,
} from "../components/dashboard/MainDashboardTabs";
import { Container, Stack } from "@mantine/core";
import HeaderSection from "../components/dashboard/HeaderSection";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";

type ListingDetailPageProps = Pick<PiletApi, "launchWorkspace">;

const ListingDetailPage: FC<ListingDetailPageProps> = ({ launchWorkspace }) => {
  const { listingId, propertyId } = useParams<{
    propertyId: string;
    listingId: string;
  }>();
  const { error, isLoading, listing } = useListing(listingId);

  if (isLoading || error || !listing) return null;

  return (
    <Container size="100%" px={0}>
      <Stack gap="xl">
        <HeaderSection listing={listing} />
        <AnalyticsOverview listing={listing} />
        <MainDashboardTabs listing={listing} />
      </Stack>
    </Container>
  );
};

export default ListingDetailPage;
