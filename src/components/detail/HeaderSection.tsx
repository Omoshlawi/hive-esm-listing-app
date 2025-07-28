import { TablerIcon, When } from "@hive/esm-core-components";
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
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconCalculator,
  IconCalendar,
  IconEye,
  IconHeart,
  IconMapPinFilled,
  IconMessage,
  IconPhone,
  IconPrinter,
  IconShare,
  IconStar,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useProperty } from "../../hooks";
import { Listing } from "../../types";
import { getStatusColor } from "../../utils/helpers";
import { useContactPerson } from "../../hooks";
import { getHiveFileUrl } from "@hive/esm-core-api";

const HeaderSection = ({ listing }: { listing: Listing }) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const [favorited, setFavorited] = useState(false);
  const { property } = useProperty(listing.propertyId);
  const contactPersonAsync = useContactPerson(listing.contactPersonId);
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

              {listing.additionalCharges?.map((charge) => (
                <Group justify="space-between" key={charge.id}>
                  <Text size="sm" style={{ textTransform: "capitalize" }}>
                    {charge.name}(
                    {charge.frequency.replace("_", " ").toLowerCase()})
                  </Text>
                  <Text fw={500}>
                    <NumberFormatter
                      value={charge.amount}
                      prefix="Ksh."
                      thousandSeparator
                    />
                  </Text>
                </Group>
              ))}

              <Divider />

              {/* Agent Info */}
              <When
                asyncState={{
                  ...contactPersonAsync,
                  data: contactPersonAsync.contactPerson,
                }}
                success={(contact) => (
                  <>
                    <Group gap="md">
                      <Avatar
                        src={
                          contact.person.avatarUrl
                            ? getHiveFileUrl(contact.person.avatarUrl)
                            : undefined
                        }
                        size="md"
                      />
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {contact.person.name ?? contact?.person?.email}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {contact.person.phoneNumber}
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
                            (3)
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
                  </>
                )}
                loading={() => (
                  <>
                    <Group gap="md">
                      <Skeleton height={50} circle mb="xl" />

                      <div style={{ flex: 1 }}>
                        <Skeleton height={10} radius="xl" />

                        <Skeleton height={8} radius="xl" />

                        <Group gap="xs" mt="xs">
                          <Skeleton height={10} radius="xl" w={"70"} />
                          <Skeleton height={10} radius="xl" w={"20"} />
                        </Group>
                      </div>
                    </Group>

                    <Stack gap="xs">
                      <Skeleton height={40} radius="sm" w={"100%"} />
                      <Skeleton height={40} radius="sm" w={"100%"} />

                      <Group grow>
                        <Skeleton height={40} radius="sm" w={"100%"} />
                        <Skeleton height={40} radius="sm" w={"100%"} />
                      </Group>
                    </Stack>
                  </>
                )}
              />
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default HeaderSection;
