import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../hooks";
import { MainDashboardTabs } from "../components/dashboard/MainDashboardTabs";
import {
  Anchor,
  Card,
  Center,
  Container,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Text,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import ListingThumbnail from "../components/dashboard/ListingThumbnail";
import { IconInfoCircle } from "@tabler/icons-react";
import { PropsWithLaunchWorkspace } from "../types";
import { closeModal, openModal } from "@mantine/modals";
import ThumbnailUploadForm from "../forms/ThumbnailUploadForm";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import ListingPropertyDetails from "../components/dashboard/ListingPropertyDetails";

type ListingDetailPageProps = PropsWithLaunchWorkspace & {};
const activities = [
  {
    id: "act-1",
    type: "INQUIRY",
    description: "New inquiry from John Smith",
    timestamp: "2024-01-20T10:30:00Z",
    user: "System",
  },
  {
    id: "act-2",
    type: "STATUS_CHANGE",
    description: "Status changed from PENDING to APPROVED",
    timestamp: "2024-01-15T09:00:00Z",
    user: "Admin",
  },
  {
    id: "act-3",
    type: "PRICE_UPDATE",
    description: "Price updated from $1,300,000 to $1,250,000",
    timestamp: "2024-01-14T16:20:00Z",
    user: "Agent",
  },
  {
    id: "act-4",
    type: "MEDIA_UPLOAD",
    description: "3 new photos uploaded",
    timestamp: "2024-01-13T11:15:00Z",
    user: "Agent",
  },
];
const ListingDetailPage: FC<ListingDetailPageProps> = ({ launchWorkspace }) => {
  const { listingId } = useParams<{
    listingId: string;
  }>();
  const { error, isLoading, listing } = useListing(listingId);
  const theme = useMantineTheme();

  const handleUploadThumbnail = () => {
    const modalId = openModal({
      title: "Upload Thumbnail",
      children: (
        <ThumbnailUploadForm
          listing={listing}
          onClose={() => closeModal(modalId)}
        />
      ),
    });
  };
  if (isLoading || error || !listing) return null;

  return (
    <Stack gap="xs">
      {/* Property Image */}
      <ListingThumbnail listing={listing} />

      <Card withBorder>
        <Text size="lg" fw={600}>
          Description
        </Text>
        <Center>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {listing?.description ? listing.description : "No Description"}
          </Text>
        </Center>
      </Card>
      <ListingPropertyDetails listing={listing} />
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <MainDashboardTabs listing={listing} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <ProfileCompletion listing={listing} />
        </Grid.Col>
      </Grid>
      {/* <Card p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Recent Activity</Title>
          <Stack gap="xs">
            {activities.slice(0, 3).map((activity) => (
              <Group key={activity.id} gap="xs" align="flex-start">
                <ThemeIcon size="sm" variant="light" color={theme.primaryColor}>
                  <IconInfoCircle size={12} />
                </ThemeIcon>
                <div style={{ flex: 1 }}>
                  <Text size="sm">{activity.description}</Text>
                  <Text size="xs" c="dimmed">
                    {new Date(activity.timestamp).toLocaleDateString()} by{" "}
                    {activity.user}
                  </Text>
                </div>
              </Group>
            ))}
          </Stack>
          <Anchor size="sm" href="#activity">
            View all activity
          </Anchor>
        </Stack>
      </Card> */}
    </Stack>
  );
};

export default ListingDetailPage;
