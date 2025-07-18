import {
  Paper,
  Grid,
  Box,
  Badge,
  Stack,
  Group,
  NumberFormatter,
  ActionIcon,
  Image,
  useMantineTheme,
  Text,
  Button,
} from "@mantine/core";
import {
  IconMapPin,
  IconBed,
  IconBath,
  IconRuler,
  IconHeart,
  IconShare,
  IconPhone,
  IconExternalLink,
  IconEye,
} from "@tabler/icons-react";
import React from "react";
import { Listing } from "../../types";
import { getHiveFileUrl } from "@hive/esm-core-api";
import { getListingTypeColor } from "../../utils/helpers";
import { Link } from "react-router-dom";

export const ListingRow = ({ listing }: { listing: Listing }) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
  const listingDetailUrl = `/listings/${listing.id}`;
  return (
    <Paper p="md" shadow="sm" radius="md" withBorder>
      <Grid gutter="md" align="center">
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Box style={{ position: "relative" }}>
            <Image
              src={listing.coverImage && getHiveFileUrl(listing.coverImage)}
              height={120}
              fit="cover"
              radius="sm"
              alt={listing.title}
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
            {listing.featured && (
              <Badge
                size="xs"
                variant="gradient"
                gradient={{ from: primaryColor[6], to: primaryColor[8] }}
                style={{ position: "absolute", top: 5, left: 5 }}
              >
                Featured
              </Badge>
            )}
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="xs">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={500} size="lg" component={Link} to={listingDetailUrl}>
                  {listing.title}
                </Text>
                <Group gap="xs" mt="xs">
                  <IconMapPin size={14} />
                  <Text size="sm" c="dimmed">
                    {"listing.location"}
                  </Text>
                </Group>
              </div>
              <Badge
                color={getListingTypeColor(listing.type)}
                size="xs"
                variant="filled"
              >
                {listing.type}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2}>
              {listing.description}
            </Text>

            <Group gap="md">
              <Group gap="xs">
                <IconBed size={16} />
                <Text size="sm">{"listing.bedrooms"} beds</Text>
              </Group>
              <Group gap="xs">
                <IconBath size={16} />
                <Text size="sm">{"listing.bathrooms"} baths</Text>
              </Group>
              <Group gap="xs">
                <IconRuler size={16} />
                <Text size="sm">
                  {"listing.squareFootage.toLocaleString()"} sq ft
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Stack gap="md" align="flex-end">
            <Text fw={700} size="xl" style={{ color: primaryColor[6] }}>
              <NumberFormatter
                value={listing.price}
                prefix="Ksh."
                thousandSeparator
                // suffix={listing.type === "RENT" ? "/mo" : ""}
              />
            </Text>

            <Group gap="xs">
              <ActionIcon variant="outline" size="sm">
                <IconHeart size={14} />
              </ActionIcon>
              <ActionIcon variant="outline" size="sm">
                <IconShare size={14} />
              </ActionIcon>
              <ActionIcon variant="outline" size="sm">
                <IconPhone size={14} />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                size="sm"
                component={Link}
                to={listingDetailUrl}
              >
                <IconExternalLink size={14} />
              </ActionIcon>
            </Group>

            <Group gap="xs">
              <Text size="xs" color="dimmed">
                {new Date(listing.listedDate).toLocaleDateString()}
              </Text>
              <Group gap="xs">
                <IconEye size={12} />
                <Text size="xs" color="dimmed">
                  {listing.views}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
