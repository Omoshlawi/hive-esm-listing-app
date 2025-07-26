import { getHiveFileUrl } from "@hive/esm-core-api";
import { TablerIcon } from "@hive/esm-core-components";
import {
  ActionIcon,
  Badge,
  Box,
  Grid,
  Group,
  Image,
  NumberFormatter,
  Paper,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconExternalLink,
  IconEye,
  IconHeart,
  IconMapPin,
  IconPhone,
  IconShare,
} from "@tabler/icons-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProperty } from "../../hooks";
import { Attribute, Listing } from "../../types";
import { clipText, getListingTypeColor } from "../../utils/helpers";
import { ListingRowSkeleton } from "./Skeleton";
const MAX_ATTRS = 4;

export const ListingRow = ({ listing }: { listing: Listing }) => {
  const theme = useMantineTheme();
  const { isLoading, property } = useProperty(listing.propertyId);
  const attributes = useMemo(
    () =>
      // Get Attributes with number like values and icon and retreive trim the first four for list view
      (property?.attributes ?? []).reduce<Array<Attribute>>((prev, curr) => {
        if (prev.length > MAX_ATTRS) return prev;
        const val = Number(curr.value);
        if (val && curr.attribute.icon) {
          prev.push(curr);
        }
        return prev;
      }, []),
    [property]
  );
  const primaryColor = theme.colors[theme.primaryColor];
  const listingDetailUrl = `/listings/${listing.id}`;

  if (isLoading) return <ListingRowSkeleton />;
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
                  {clipText(listing.title)}
                </Text>
                <Group gap="xs" mt="xs">
                  <IconMapPin size={14} />
                  <Text size="sm" c="dimmed">
                    {`${listing.property.address?.ward ?? ""}, ${
                      listing.property.address?.subCounty ?? ""
                    } ${listing.property.address?.county ?? ""}`}
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
              {property?.name}
            </Text>

            <Group gap="md">
              {attributes.map((attr) => (
                <Tooltip key={attr.id} label={attr.attribute.name}>
                  <Group gap="xs">
                    <TablerIcon
                      name={attr.attribute.icon.name as any}
                      size={16}
                    />
                    <Text size="sm">{attr.value}</Text>
                  </Group>
                </Tooltip>
              ))}
              {attributes.length === MAX_ATTRS && (
                <Tooltip label={"More attributes"}>
                  <Group gap="xs">
                    <Text size="sm">{"..."}</Text>
                  </Group>
                </Tooltip>
              )}
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
              <Text size="xs" c="dimmed">
                {new Date(listing.listedDate).toLocaleDateString()}
              </Text>
              <Group gap="xs">
                <IconEye size={12} />
                <Text size="xs" c="dimmed">
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
