import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  NumberFormatter,
  Paper,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBath,
  IconBed,
  IconBrandWhatsapp,
  IconBuildingEstate,
  IconCalculator,
  IconCalendar,
  IconCar,
  IconEye,
  IconHeart,
  IconMapPinFilled,
  IconMessage,
  IconPhone,
  IconPrinter,
  IconRuler,
  IconShare,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Listing } from "../../types";
import { getStatusColor } from "../../utils/helpers";
import { useProperty } from "../../hooks";
import { TablerIcon } from "@hive/esm-core-components";

const HeaderSection = ({ listing }: { listing: Listing }) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const [favorited, setFavorited] = useState(false);
  const { isLoading, property } = useProperty(listing.propertyId);
  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];

  return (
    <Paper p={{ base: "xl", md: "xl" }} radius="lg" shadow="sm">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Group gap="xs" wrap="wrap" justify="space-between">
                  <Group gap={"xs"}>
                    <Badge
                      variant="filled"
                      color={getStatusColor(listing.status)}
                      size="lg"
                    >
                      {listing.status}
                    </Badge>
                    {listing.featured && (
                      <Badge
                        variant="gradient"
                        gradient={{ from: gradientFrom, to: gradientTo }}
                      >
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline" color={theme.primaryColor}>
                      For {listing.type}
                    </Badge>
                  </Group>
                  <Group gap="xs" wrap="nowrap">
                    <Tooltip
                      label={
                        favorited ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      <ActionIcon
                        variant={favorited ? "filled" : "outline"}
                        color="red"
                        size="lg"
                        onClick={() => setFavorited(!favorited)}
                      >
                        <IconHeart size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Share property">
                      <ActionIcon
                        variant="outline"
                        color={theme.primaryColor}
                        size="lg"
                      >
                        <IconShare size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Print details">
                      <ActionIcon
                        variant="outline"
                        color={theme.primaryColor}
                        size="lg"
                      >
                        <IconPrinter size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
                <Title order={1} size="h2" style={{ wordBreak: "break-word" }}>
                  {listing.title}
                </Title>
                <Group gap="xs">
                  <IconMapPinFilled size={16} color={theme.colors.gray[6]} />
                  <Text c="dimmed" size="sm">
                    {`${
                      property?.address?.county ??
                      listing.property.address?.county
                    } ${
                      property?.address?.subCounty ??
                      listing.property.address?.subCounty
                    } ${
                      property?.address?.ward ?? listing.property.address?.ward
                    } ${
                      property?.address?.landmark ??
                      listing.property.address?.landmark
                    }`}
                  </Text>
                </Group>
              </Stack>
            </Group>

            {/* Property Stats */}
            <SimpleGrid cols={{ base: 4, md: 2 }} spacing="xl">
              {(property?.attributes ?? []).map((attr) => (
                <Group gap="xs" key={attr.id}>
                  <ThemeIcon variant="light" color={theme.primaryColor}>
                    <TablerIcon
                      name={attr.attribute.icon.name as any}
                      size={20}
                    />
                  </ThemeIcon>
                  <div>
                    <Text fw={500}>{attr.value}</Text>
                    <Text size="xs" c="dimmed">
                      {attr.attribute.name}
                    </Text>
                  </div>
                </Group>
              ))}
            </SimpleGrid>

            {/* Quick Info */}
            <Group gap="xl" wrap="wrap">
              <Group gap="xs">
                <IconEye size={16} />
                <Text size="sm" color="dimmed">
                  {listing.views.toLocaleString()} views
                </Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={16} />
                <Text size="sm" c="dimmed">
                  Listed {new Date(listing.listedDate).toLocaleDateString()}
                </Text>
              </Group>
              <Group gap="xs">
                <IconHeart size={16} />
                <Text size="sm" c="dimmed">
                  Favourite 0
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper
            p="lg"
            radius="md"
            style={{
              background: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
              border: `2px solid ${primaryColor[6]}20`,
            }}
          >
            <Stack gap="md">
              <Group justify="space-between" align="baseline">
                <Text size="sm" color="dimmed">
                  Price
                </Text>
                {listing.saleDetails?.priceNegotiable && (
                  <Badge variant="outline" size="xs" color="green">
                    Negotiable
                  </Badge>
                )}
              </Group>
              <Title order={2} style={{ color: primaryColor[6] }}>
                <NumberFormatter
                  value={listing.price}
                  prefix="Ksh."
                  thousandSeparator
                />
              </Title>

              {listing.saleDetails && (
                <Group justify="space-between">
                  <Text size="sm">Est. Monthly Payment</Text>
                  <Text fw={500}>
                    <NumberFormatter
                      value={"listing.saleDetails.monthlyMortgage"}
                      prefix="$"
                      thousandSeparator
                    />
                  </Text>
                </Group>
              )}

              <Divider />

              {/* Agent Info */}
              <Group gap="md">
                <Avatar src={"mockListing.contactPerson.avatar"} size="md" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {"mockListing.contactPerson.name"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {"mockListing.contactPerson.title"}
                  </Text>
                  <Group gap="xs" mt="xs">
                    <Rating
                      value={3}
                      //   value={"mockListing.contactPerson.rating"}
                      fractions={2}
                      readOnly
                      size="xs"
                    />
                    <Text size="xs" c="dimmed">
                      ({"mockListing.contactPerson.rating"})
                    </Text>
                  </Group>
                </div>
              </Group>

              <Stack gap="xs">
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: gradientFrom, to: gradientTo }}
                  leftSection={<IconPhone size={16} />}
                >
                  Call Agent
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  color={theme.primaryColor}
                  leftSection={<IconMessage size={16} />}
                >
                  Send Message
                </Button>
                <Group grow>
                  <Button
                    variant="outline"
                    color="green"
                    leftSection={<IconBrandWhatsapp size={16} />}
                    size="sm"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    color={theme.primaryColor}
                    leftSection={<IconCalculator size={16} />}
                    size="sm"
                  >
                    Calculator
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default HeaderSection;
