import { getHiveFileUrl } from "@hive/esm-core-api";
import { TablerIcon } from "@hive/esm-core-components";
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Group,
  Image,
  NumberFormatter,
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
import { getListingTypeColor, getStatusColor } from "../../utils/helpers";
import { ListingCardSkeleton } from "./Skeleton";

const MAX_ATTRS = 4;

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const { isLoading, property, error } = useProperty(listing.propertyId);
  const theme = useMantineTheme();
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
  const listingDetailUrl = `/listings/${listing.id}`;

  const primaryColor = theme.colors[theme.primaryColor];
  if (isLoading) return <ListingCardSkeleton />;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Box style={{ position: "relative" }}>
          <Image
            src={listing.coverImage && getHiveFileUrl(listing.coverImage)}
            height={200}
            fit="cover"
            alt={listing.title}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
          {listing.featured && (
            <Badge
              variant="gradient"
              gradient={{ from: primaryColor[6], to: primaryColor[8] }}
              style={{ position: "absolute", top: 10, left: 10 }}
            >
              Featured
            </Badge>
          )}
          <Group gap="xs" style={{ position: "absolute", top: 10, right: 10 }}>
            <ActionIcon variant="filled" color="black" size="sm">
              <IconHeart size={14} />
            </ActionIcon>
            <ActionIcon variant="filled" color="black" size="sm">
              <IconShare size={14} />
            </ActionIcon>
          </Group>
          <Group
            gap="xs"
            style={{ position: "absolute", bottom: 10, left: 10 }}
          >
            <Badge color={getListingTypeColor(listing.type)} size="xs">
              {listing.type}
            </Badge>
            <Badge size="xs" color={getStatusColor(listing.status)}>
              {listing.status}
            </Badge>
          </Group>
        </Box>
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Text
          fw={500}
          size="lg"
          lineClamp={1}
          component={Link}
          to={listingDetailUrl}
        >
          {listing.title}
        </Text>
        <Group gap="xs" mt="xs">
          <IconMapPin size={14} />
          <Text size="sm" c="dimmed">
            {`${listing.property.address?.ward ?? ""}, ${
              listing.property.address?.subCounty ?? ""
            } ${listing.property.address?.county ?? ""}`}
          </Text>
        </Group>
        <Group justify="space-between">
          <Group gap="md">
            {attributes.map((attribute) => (
              <Tooltip label={attribute.attribute.name} key={attribute.id}>
                <Group gap="xs">
                  <TablerIcon
                    name={attribute.attribute.icon?.name as any}
                    size={16}
                  />
                  <Text size="sm">{attribute.value}</Text>
                </Group>
              </Tooltip>
            ))}
            {attributes.length === MAX_ATTRS && (
              <Group gap="xs">
                <Tooltip label={"More"}>
                  <Text size="sm">{"..."}</Text>
                </Tooltip>
              </Group>
            )}
          </Group>
          <Group gap="xs">
            <IconEye size={14} />
            <Text size="xs" c="dimmed">
              {listing.views}
            </Text>
          </Group>
        </Group>

        <Group justify="space-between" align="center">
          <Text fw={700} size="xl" style={{ color: primaryColor[6] }}>
            <NumberFormatter
              value={listing.price}
              prefix="Ksh."
              thousandSeparator
              // suffix={listing.type === "RENT" ? "/mo" : ""}
            />
          </Text>
          <Group gap="xs">
            <Tooltip label="Call Agent">
              <ActionIcon
                variant="outline"
                size="sm"
                color={theme.primaryColor}
              >
                <IconPhone size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="View Details">
              <ActionIcon
                variant="outline"
                size="sm"
                color={theme.primaryColor}
                component={Link}
                to={listingDetailUrl}
              >
                <IconExternalLink size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
