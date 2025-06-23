import {
  Card,
  Box,
  Badge,
  Group,
  ActionIcon,
  Stack,
  NumberFormatter,
  Tooltip,
  Image,
  useMantineTheme,
  Text,
} from "@mantine/core";
import {
  IconHeart,
  IconShare,
  IconMapPin,
  IconBed,
  IconBath,
  IconRuler,
  IconEye,
  IconPhone,
  IconExternalLink,
} from "@tabler/icons-react";
import React from "react";
import { getListingTypeColor, getStatusColor } from "../../utils/helpers";
import { Listing } from "../../types";
import { getHiveFileUrl } from "@hive/esm-core-api";

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
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
        <Text fw={500} size="lg" lineClamp={1}>
          {listing.title}
        </Text>
        <Group gap="xs" mt="xs">
          <IconMapPin size={14} />
          <Text size="sm" c="dimmed">
            {`${listing.property.address?.landmark ?? ""} ${
              listing.property.address?.ward ?? ""
            }, ${listing.property.address?.subCounty ?? ""} ${
              listing.property.address?.county ?? ""
            }`}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {listing.description}
        </Text>

        <Group justify="space-between">
          <Group gap="md">
            <Group gap="xs">
              <IconBed size={16} />
              <Text size="sm">{2}</Text>
            </Group>
            <Group gap="xs">
              <IconBath size={16} />
              <Text size="sm">{2}</Text>
            </Group>
            <Group gap="xs">
              <IconRuler size={16} />
              <Text size="sm">{20} sq ft</Text>
            </Group>
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
