import {
  useMantineTheme,
  Paper,
  Stack,
  Skeleton,
  Group,
  Divider,
  Card,
  Grid,
  SimpleGrid,
} from "@mantine/core";
import React from "react";

export const SearchSkeleton = () => {
  const theme = useMantineTheme();
  return (
    <Paper p="lg" radius="md" shadow="sm">
      <Stack gap="md">
        <Skeleton height={40} radius="md" />
        <Group justify="space-between" wrap="wrap">
          <Group gap="md">
            <Skeleton height={36} width={120} radius="md" />
            <Skeleton height={20} width={150} radius="md" />
          </Group>
          <Group gap="md">
            <Skeleton height={36} width={180} radius="md" />
            <Skeleton height={36} width={80} radius="md" />
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};

export const FilterSkeleton = () => (
  <Paper p="lg" radius="md" shadow="sm">
    <Stack gap="md">
      <Group justify="space-between">
        <Skeleton height={20} width={60} />
        <Skeleton height={20} width={20} radius="xl" />
      </Group>

      {/* Listing Type Skeleton */}
      <Stack gap="xs">
        <Skeleton height={16} width={80} />
        <Skeleton height={36} radius="md" />
      </Stack>

      {/* Location Skeleton */}
      <Stack gap="xs">
        <Skeleton height={16} width={60} />
        <Skeleton height={36} radius="md" />
      </Stack>

      {/* Price Range Skeleton */}
      <Stack gap="xs">
        <Skeleton height={16} width={120} />
        <Skeleton height={20} radius="md" />
        <Group justify="space-between">
          <Skeleton height={12} width={20} />
          <Skeleton height={12} width={30} />
          <Skeleton height={12} width={25} />
        </Group>
      </Stack>

      {/* Advanced Filters Button */}
      <Skeleton height={36} radius="md" />

      <Divider />

      {/* Clear Filters Button */}
      <Skeleton height={36} radius="md" />
    </Stack>
  </Paper>
);

export const ListingCardSkeleton = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Skeleton height={200} />
    </Card.Section>

    <Stack gap="md" mt="md">
      <div>
        <Group justify="space-between" align="flex-start">
          <div style={{ flex: 1 }}>
            <Skeleton height={24} width="80%" />
            <Group gap="xs" mt="xs">
              <Skeleton height={14} width={14} radius="xl" />
              <Skeleton height={16} width="60%" />
            </Group>
          </div>
          <Skeleton height={28} width={100} />
        </Group>
      </div>

      <Skeleton height={40} />

      <Group justify="space-between">
        <Group gap="md">
          <Group gap="xs">
            <Skeleton height={16} width={16} radius="xl" />
            <Skeleton height={16} width={20} />
          </Group>
          <Group gap="xs">
            <Skeleton height={16} width={16} radius="xl" />
            <Skeleton height={16} width={20} />
          </Group>
          <Group gap="xs">
            <Skeleton height={16} width={16} radius="xl" />
            <Skeleton height={16} width={60} />
          </Group>
        </Group>
        <Group gap="xs">
          <Skeleton height={14} width={14} radius="xl" />
          <Skeleton height={14} width={30} />
        </Group>
      </Group>

      <Group justify="space-between" align="center">
        <Group gap="xs">
          <Skeleton height={12} width={80} />
          <Skeleton height={16} width={60} radius="xl" />
        </Group>
        <Group gap="xs">
          <Skeleton height={28} width={28} radius="xl" />
          <Skeleton height={28} width={28} radius="xl" />
        </Group>
      </Group>
    </Stack>
  </Card>
);

export const ListingRowSkeleton = () => (
  <Paper p="md" shadow="sm" radius="md" withBorder>
    <Grid gutter="md" align="center">
      <Grid.Col span={{ base: 12, sm: 3 }}>
        <Skeleton height={120} radius="sm" />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start">
            <div style={{ flex: 1 }}>
              <Skeleton height={24} width="70%" />
              <Group gap="xs" mt="xs">
                <Skeleton height={14} width={14} radius="xl" />
                <Skeleton height={16} width="50%" />
              </Group>
            </div>
            <Skeleton height={20} width={60} radius="xl" />
          </Group>

          <Skeleton height={40} />

          <Group gap="md">
            <Group gap="xs">
              <Skeleton height={16} width={16} radius="xl" />
              <Skeleton height={16} width={50} />
            </Group>
            <Group gap="xs">
              <Skeleton height={16} width={16} radius="xl" />
              <Skeleton height={16} width={60} />
            </Group>
            <Group gap="xs">
              <Skeleton height={16} width={16} radius="xl" />
              <Skeleton height={16} width={70} />
            </Group>
          </Group>
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 3 }}>
        <Stack gap="md" align="flex-end">
          <Skeleton height={32} width={120} />
          <Group gap="xs">
            <Skeleton height={28} width={28} radius="xl" />
            <Skeleton height={28} width={28} radius="xl" />
            <Skeleton height={28} width={28} radius="xl" />
            <Skeleton height={28} width={28} radius="xl" />
          </Group>
          <Group gap="xs">
            <Skeleton height={12} width={80} />
            <Group gap="xs">
              <Skeleton height={12} width={12} radius="xl" />
              <Skeleton height={12} width={30} />
            </Group>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  </Paper>
);

export const ListingGridSkeleton = ({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) => (
  <Stack gap="md">
    {viewMode === "grid" ? (
      <SimpleGrid spacing="lg" cols={{ base: 1, sm: 2, lg: 3 }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ListingCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    ) : (
      <Stack gap="md">
        {Array.from({ length: 6 }).map((_, index) => (
          <ListingRowSkeleton key={index} />
        ))}
      </Stack>
    )}

    {/* Pagination Skeleton */}
    <Group justify="center" mt="xl">
      <Group gap="xs">
        <Skeleton height={32} width={32} radius="md" />
        <Skeleton height={32} width={32} radius="md" />
        <Skeleton height={32} width={32} radius="md" />
        <Skeleton height={32} width={40} radius="md" />
        <Skeleton height={32} width={32} radius="md" />
        <Skeleton height={32} width={32} radius="md" />
        <Skeleton height={32} width={32} radius="md" />
      </Group>
    </Group>
  </Stack>
);
