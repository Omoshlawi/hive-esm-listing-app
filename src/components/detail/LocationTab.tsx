import React, { FC } from "react";
import { Listing } from "../../types";
import {
  Stack,
  Paper,
  Title,
  Group,
  SimpleGrid,
  ThemeIcon,
  Box,
  Text,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconMapPinFilled,
  IconMapPin,
  IconBus,
  IconSchool,
  IconShoppingCart,
  IconStethoscope,
} from "@tabler/icons-react";

type Props = {
  listing: Listing;
};

const nearbyPlaces = [
  {
    name: "Metro Central Station",
    distance: "0.3 miles",
    type: "transport",
    icon: IconBus,
  },
  {
    name: "Downtown Elementary",
    distance: "0.5 miles",
    type: "education",
    icon: IconSchool,
  },
  {
    name: "City General Hospital",
    distance: "0.8 miles",
    type: "healthcare",
    icon: IconStethoscope,
  },
  {
    name: "Grand Shopping Mall",
    distance: "0.4 miles",
    type: "shopping",
    icon: IconShoppingCart,
  },
];

const LocationTab: FC<Props> = ({ listing }) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
  const colorScheme = useComputedColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack gap="xl">
      {/* Address */}
      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md">
          <Title order={4}>Address</Title>
          <Group gap="xs">
            <IconMapPinFilled size={20} color={primaryColor[6]} />
            <Text size="lg" fw={500}>
              {`${listing.property.address.county} ${listing.property.address.subCounty} ${listing.property.address.ward} ${listing.property.address.landmark}`}
            </Text>
          </Group>
        </Stack>
      </Paper>

      {/* Nearby Places */}
      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md">
          <Title order={4}>Nearby Places</Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {nearbyPlaces.map((place, index) => (
              <Group key={index} gap="md">
                <ThemeIcon variant="light" color={theme.primaryColor}>
                  <place.icon size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>{place.name}</Text>
                  <Text size="sm" color="dimmed">
                    {place.distance}
                  </Text>
                </div>
              </Group>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>

      {/* Map Placeholder */}
      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md">
          <Title order={4}>Map View</Title>
          <Box
            style={{
              height: 400,
              background: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
              borderRadius: theme.radius.md,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack align="center" gap="md">
              <IconMapPin size={48} color={theme.colors.gray[5]} />
              <Text color="dimmed">
                Interactive map would be displayed here
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default LocationTab;
