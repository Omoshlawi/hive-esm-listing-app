import React, { FC, useState } from "react";
import { Listing } from "../../types";
import {
  ActionIcon,
  Anchor,
  Button,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Title,
  Text,
  Image,
  useMantineTheme,
} from "@mantine/core";
import {
  IconUpload,
  IconEdit,
  IconEye,
  IconShare,
  IconDownload,
  IconRefresh,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useListingMedia } from "../../hooks";
import { getHiveFileUrl } from "@hive/esm-core-api";

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

const ListingGalary: FC<Props> = ({ listing }) => {
  const theme = useMantineTheme();
  const [selectedImage, setSelectedImage] = useState(listing?.coverImage);
  const { error, isLoading, media } = useListingMedia(listing.id);
  const primaryColor = theme.colors[theme.primaryColor];

  if (isLoading || error) return null;
  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Stack gap="xl">
          {/* Property Image */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Property Images</Title>
                <Button
                  variant="outline"
                  size="xs"
                  leftSection={<IconUpload size={14} />}
                >
                  Upload More
                </Button>
              </Group>
              <Image
                src={
                  selectedImage
                    ? getHiveFileUrl(selectedImage)
                    : getHiveFileUrl(listing.coverImage)
                }
                height={300}
                fit="contain"
                radius="md"
              />
              <SimpleGrid cols={5} spacing="xs">
                {media
                  .filter((m) => m.mediaType === "IMAGE")
                  .slice(0, 5)
                  .map((image) => (
                    <Image
                      key={image.id}
                      src={
                        image.url
                          ? getHiveFileUrl(image.url)
                          : "/placeholder.svg"
                      }
                      height={60}
                      fit="cover"
                      radius="sm"
                      style={{
                        cursor: "pointer",
                        opacity: selectedImage === image.url ? 1 : 0.7,
                        border:
                          selectedImage === image.url
                            ? `2px solid ${primaryColor[6]}`
                            : "none",
                      }}
                      onClick={() => setSelectedImage(image.url)}
                    />
                  ))}
              </SimpleGrid>
            </Stack>
          </Paper>

          {/* Description */}
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

export default ListingGalary;
