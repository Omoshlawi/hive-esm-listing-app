import { getHiveFileUrl } from "@hive/esm-core-api";
import {
  ActionIcon,
  Anchor,
  Button,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { IconEdit, IconInfoCircle, IconUpload } from "@tabler/icons-react";
import React, { FC } from "react";
import { Listing } from "../../types";
import ThumbnailUploadForm from "../../forms/ThumbnailUploadForm";

type Props = {
  listing: Listing;
};

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

const ListingOverviewTab: FC<Props> = ({ listing }) => {
  const theme = useMantineTheme();
  const img = getHiveFileUrl(listing.coverImage);

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
  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Stack gap="xl">
          {/* Property Image */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Cover photo</Title>
                <Button
                  variant="outline"
                  size="xs"
                  leftSection={<IconUpload size={14} />}
                  onClick={handleUploadThumbnail}
                >
                  Update
                </Button>
              </Group>
              <Image
                src={img}
                height={320}
                fit="cover"
                radius="md"
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                role="button"
                onClick={
                  img
                    ? () =>
                        openModal({
                          fullScreen: true,
                          title: listing.title,
                          children: (
                            <Image
                              src={img}
                              fit="contain"
                              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                              w={"100%"}
                              h={"100%"}
                            />
                          ),
                        })
                    : undefined
                }
              />
            </Stack>
          </Paper>

          {/* Description */}
          {listing.description && (
            <Paper p="lg" radius="md" shadow="sm">
              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={4}>Description</Title>
                  <ActionIcon variant="outline" size="sm">
                    <IconEdit size={14} />
                  </ActionIcon>
                </Group>
                <Text>{listing.description}</Text>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={12}>
        {/* Recent Activity */}
        <Paper p="lg" radius="md" shadow="sm">
          <Stack gap="md">
            <Title order={4}>Recent Activity</Title>
            <Stack gap="xs">
              {activities.slice(0, 3).map((activity) => (
                <Group key={activity.id} gap="xs" align="flex-start">
                  <ThemeIcon
                    size="sm"
                    variant="light"
                    color={theme.primaryColor}
                  >
                    <IconInfoCircle size={12} />
                  </ThemeIcon>
                  <div style={{ flex: 1 }}>
                    <Text size="sm">{activity.description}</Text>
                    <Text size="xs" color="dimmed">
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
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default ListingOverviewTab;
