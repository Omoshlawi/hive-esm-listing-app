import React, { FC, useEffect, useState } from "react";
import { Listing } from "../../types";
import {
  Paper,
  Stack,
  Group,
  Title,
  Button,
  Box,
  Badge,
  ActionIcon,
  SimpleGrid,
  Image,
  Text,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconMaximize,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useListingMedia } from "../../hooks";
import { getHiveFileUrl } from "@hive/esm-core-api";

type Props = {
  listing: Listing;
};

const MediaGalary: FC<Props> = ({ listing }) => {
  const {
    media: images,
    error,
    isLoading,
  } = useListingMedia(listing.id, "IMAGE");
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];

  if (isLoading || error) return null;

  return (
    <Paper p="lg" radius="lg" shadow="sm">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Property Gallery</Title>
          <Button variant="subtle" leftSection={<IconMaximize size={16} />}>
            View All ({images.length})
          </Button>
        </Group>

        {/* Main Image Display */}
        <Box style={{ position: "relative" }}>
          <Image
            src={
              images[currentImageIndex]?.url
                ? getHiveFileUrl(images[currentImageIndex]?.url)
                : listing.coverImage
                ? getHiveFileUrl(listing.coverImage)
                : null
            }
            height={500}
            fit="cover"
            radius="md"
            alt="Property main image"
            style={{ cursor: "pointer" }}
            // onClick={openGalleryModal}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />

          {listing.featured && (
            <Badge
              variant="gradient"
              gradient={{ from: gradientFrom, to: gradientTo }}
              style={{
                position: "absolute",
                top: 15,
                left: 15,
              }}
            >
              Featured Property
            </Badge>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <ActionIcon
                variant="filled"
                color="black"
                size="lg"
                style={{
                  position: "absolute",
                  left: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex > -1
                      ? currentImageIndex - 1
                      : images.length - 1
                  )
                }
              >
                <IconChevronLeft size={20} />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color="black"
                size="lg"
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex < images.length - 1
                      ? currentImageIndex + 1
                      : -1
                  )
                }
              >
                <IconChevronRight size={20} />
              </ActionIcon>
            </>
          )}

          {/* Image Counter */}
          <Badge
            variant="filled"
            color="dark"
            style={{
              position: "absolute",
              bottom: 15,
              right: 15,
            }}
          >
            {currentImageIndex + 1} / {images.length}
          </Badge>
        </Box>

        <SimpleGrid cols={{ lg: 6, base: 4 }} spacing="xs">
          <Image
            src={getHiveFileUrl(listing.coverImage)}
            height={80}
            fit="cover"
            radius="sm"
            style={{
              cursor: "pointer",
              opacity: currentImageIndex === -1 ? 1 : 0.7,
              border:
                currentImageIndex === -1
                  ? `2px solid ${primaryColor[6]}`
                  : "none",
            }}
            onClick={() => setCurrentImageIndex(-1)}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          {images.map((image, index) => (
            <Image
              key={image.id}
              src={image.url ? getHiveFileUrl(image.url) : null}
              height={80}
              fit="cover"
              radius="sm"
              style={{
                cursor: "pointer",
                opacity: index === currentImageIndex ? 1 : 0.7,
                border:
                  index === currentImageIndex
                    ? `2px solid ${primaryColor[6]}`
                    : "none",
              }}
              onClick={() => setCurrentImageIndex(index)}
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default MediaGalary;
