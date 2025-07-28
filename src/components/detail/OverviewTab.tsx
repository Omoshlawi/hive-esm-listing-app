import {
  Grid,
  Stack,
  Paper,
  Title,
  SimpleGrid,
  Group,
  ThemeIcon,
  NumberFormatter,
  Button,
  Text,
  useMantineTheme,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconCalendar,
  IconBuildingEstate,
  IconKey,
  IconUsers,
  IconShield,
  IconTrendingUp,
  IconCheck,
} from "@tabler/icons-react";
import React, { FC, useMemo } from "react";
import { Listing } from "../../types";
import { openModal } from "@mantine/modals";
import { TablerIcon, TablerIconName } from "@hive/esm-core-components";
import { useProperty } from "../../hooks";

type Props = {
  listing: Listing;
  scheduleViewingExtensionSlot: React.JSX.Element;
};

const financingOptions = [
  {
    option: {
      name: "Cash",
      description: "Full cash payment with 5% discount",
    },
  },
  {
    option: {
      name: "Mortgage",
      description: "Bank financing available up to 80% LTV",
    },
  },
  {
    option: {
      name: "Installments",
      description: "Developer financing over 5 years",
    },
  },
];
const _amenities = [
  "Swimming Pool",
  "Fitness Center",
  "24/7 Concierge",
  "Rooftop Terrace",
  "Wine Cellar",
  "Valet Parking",
  "Business Center",
  "Guest Suites",
  "Private Elevator",
  "Smart Home System",
  "Floor-to-ceiling Windows",
  "Premium Appliances",
  "Walk-in Closets",
  "Marble Bathrooms",
];

const OverviewTab: FC<Props> = ({ listing, scheduleViewingExtensionSlot }) => {
  const theme = useMantineTheme();
  const { property } = useProperty(listing.propertyId);
  const amenities = useMemo<
    Array<{ icon: TablerIconName; amenity: string }>
  >(() => {
    const amenities_ = (property?.amenities ?? []).map((amenity) => ({
      icon: amenity.amenity.icon.name as any,
      amenity: amenity.amenity.name,
    }));
    amenities_.push(
      ..._amenities.map((am) => ({ icon: "check", amenity: am }))
    );
    return amenities_;
  }, [property]);

  const features = useMemo<Array<{ icon: TablerIconName; feature: string }>>(
    () => [
      { feature: listing.type, icon: "building" },
      { feature: `${listing.featured}`, icon: "building" },
      { feature: `${property.isVirtual}`, icon: "viewportShort" },
    ],
    [property, listing]
  );
  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack gap="xl">
          {/* Description */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>About This Property</Title>
              <Text style={{ lineHeight: 1.6 }}>
                {listing.description ?? "No Description"}
              </Text>
              <Divider />
              <Group gap={"xs"}>
                {listing.tags.map((tag) => (
                  <Badge
                    size="xs"
                    variant="default"
                    style={{ textTransform: "capitalize" }}
                  >{`# ${tag}`}</Badge>
                ))}
              </Group>
            </Stack>
          </Paper>

          {/* Key Features */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Key Features</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Group gap="xs">
                  <IconCalendar size={16} />
                  <Text size="sm">
                    Built in {"mockListing.property.yearBuilt"}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconBuildingEstate size={16} />
                  <Text size="sm">{"mockListing.property.propertyType"}</Text>
                </Group>
                <Group gap="xs">
                  <IconKey size={16} />
                  <Text size="sm">{"mockListing.property.furnished"}</Text>
                </Group>
                <Group gap="xs">
                  <IconUsers size={16} />
                  <Text size="sm">{"mockListing.property.petPolicy"}</Text>
                </Group>
                <Group gap="xs">
                  <IconShield size={16} />
                  <Text size="sm">
                    Title Deed{" "}
                    {listing.saleDetails?.titleDeedReady ? "Ready" : "Pending"}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconTrendingUp size={16} />
                  <Text size="sm">
                    Price{" "}
                    {listing.saleDetails?.priceNegotiable
                      ? "Negotiable"
                      : "Fixed"}
                  </Text>
                </Group>
              </SimpleGrid>
            </Stack>
          </Paper>

          {/* Amenities */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Amenities & Features</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xs">
                {amenities.map((amenity, index) => (
                  <Group key={index} gap="xs">
                    <ThemeIcon
                      size="sm"
                      variant="light"
                      color={theme.primaryColor}
                    >
                      <TablerIcon name={amenity.icon} size={12} />
                    </ThemeIcon>
                    <Text size="sm">{amenity.amenity}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Stack gap="md">
          {/* Quick Stats */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Property Stats</Title>
              <Group justify="space-between">
                <Text size="sm">Price per sq ft</Text>
                <Text fw={500}>
                  <NumberFormatter
                    // value={listing.price / mockListing.property.squareFootage}
                    value={20}
                    prefix="$"
                    decimalScale={0}
                  />
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Property Age</Text>
                <Text fw={500}>
                  {`new Date().getFullYear() - mockListing.property.yearBuilt`}{" "}
                  years
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Days on Market</Text>
                <Text fw={500}>
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(listing.listedDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Total Views</Text>
                <Text fw={500}>{listing.views.toLocaleString()}</Text>
              </Group>
            </Stack>
          </Paper>

          {/* Financing Options */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Financing Options</Title>
              {financingOptions?.map((option, index) => (
                <Group key={index} gap="xs" align="flex-start">
                  <ThemeIcon
                    size="sm"
                    variant="light"
                    color={theme.primaryColor}
                  >
                    <IconCheck size={12} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={500}>
                      {option.option.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {option.option.description}
                    </Text>
                  </div>
                </Group>
              ))}
            </Stack>
          </Paper>

          {/* Schedule Viewing */}
          {scheduleViewingExtensionSlot}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default OverviewTab;
