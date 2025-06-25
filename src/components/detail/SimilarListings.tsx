import React, { FC } from "react";
import { Listing } from "../../types";
import {
  Paper,
  Stack,
  Title,
  SimpleGrid,
  Card,
  NumberFormatter,
  Group,
  Button,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBed, IconBath, IconRuler } from "@tabler/icons-react";

type Props = {
  listing: Listing;
};

const similarListings = [
  {
    id: "similar-1",
    title: "Modern Downtown Condo",
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1800,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "similar-2",
    title: "Luxury High-Rise Apartment",
    price: 1450000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2600,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "similar-3",
    title: "Executive Penthouse Suite",
    price: 1850000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 3200,
    image: "/placeholder.svg?height=200&width=300",
  },
];
const SimilarListings: FC<Props> = ({ listing }) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];

  return (
    <Paper p="lg" radius="md" shadow="sm">
      <Stack gap="md">
        <Title order={3}>Similar Properties</Title>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
          {similarListings.map((similar) => (
            <Card
              key={similar.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  src={similar.image}
                  height={160}
                  fit="cover"
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
              </Card.Section>
              <Stack gap="xs" mt="md">
                <Text fw={500} lineClamp={1}>
                  {similar.title}
                </Text>
                <Text fw={700} size="lg" style={{ color: primaryColor[6] }}>
                  <NumberFormatter
                    value={similar.price}
                    prefix="Ksh."
                    thousandSeparator
                  />
                </Text>
                <Group gap="md">
                  <Group gap="xs">
                    <IconBed size={14} />
                    <Text size="sm">{similar.bedrooms}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconBath size={14} />
                    <Text size="sm">{similar.bathrooms}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconRuler size={14} />
                    <Text size="sm">
                      {similar.squareFootage.toLocaleString()}
                    </Text>
                  </Group>
                </Group>
                <Button variant="outline" size="sm" fullWidth>
                  View Details
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default SimilarListings;
