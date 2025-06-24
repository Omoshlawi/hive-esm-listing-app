"use client";

import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHome, IconRefresh } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  FilterSkeleton,
  ListingGridSkeleton,
  ListingRow,
  ListingsPagination,
  SearchSkeleton,
} from "../components/discovery";
import { FilterContent } from "../components/discovery/FilterContent";
import { ListingCard } from "../components/discovery/ListingCard";
import SearchAndFiltersHeader from "../components/discovery/SearchAndFiltersHeader";
import { useListingFilterParams, useListings } from "../hooks";

export function ListingDiscoveryPage() {
  const [params, , clear] = useListingFilterParams();
  const { error, isLoading, listings } = useListings(params);
  const theme = useMantineTheme();

  if (isLoading)
    return (
      <Container size="100%" px={0}>
        <Stack gap="xl">
          <SearchSkeleton />
          <Grid gutter="xl">
            {/* Desktop Filters Sidebar */}
            <Grid.Col span={3} visibleFrom={"md"}>
              <FilterSkeleton />
            </Grid.Col>

            {/* Listings Grid/List */}
            <Grid.Col span={{ base: 12, md: 9 }}>
              <ListingGridSkeleton viewMode={params.view} />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    );

  return (
    <Container size="100%" px={0}>
      <Stack gap="xl">
        {/* Search and Filter Header */}
        <SearchAndFiltersHeader listings={listings} />

        <Grid gutter="xl">
          {/* Desktop Filters Sidebar */}
          <Grid.Col span={3} visibleFrom={"md"}>
            <Paper
              p="lg"
              radius="md"
              shadow="sm"
              style={{ position: "sticky", top: 20 }}
            >
              {/* <Group justify="space-between" mb="md">
                <Text fw={500}>Filters</Text>
                {activeFiltersCount > 0 && (
                  <Badge size="sm" color={theme.primaryColor}>
                    {activeFiltersCount}
                  </Badge>
                )}
              </Group> */}
              <FilterContent />
            </Paper>
          </Grid.Col>

          {/* Listings Grid/List */}
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Stack gap="md">
              {listings.length > 0 ? (
                <>
                  {params.view === "grid" ? (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                      {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Stack gap="md">
                      {listings.map((listing) => (
                        <ListingRow key={listing.id} listing={listing} />
                      ))}
                    </Stack>
                  )}

                  {/* Pagination */}
                  <ListingsPagination />
                </>
              ) : (
                <Paper p="xl" radius="md" style={{ textAlign: "center" }}>
                  <Stack gap="md" align="center">
                    <IconHome size={48} color={theme.colors.gray[5]} />
                    <div>
                      <Text size="lg" fw={500}>
                        No properties found
                      </Text>
                      <Text size="sm" color="dimmed" mt="xs">
                        Try adjusting your search criteria or filters
                      </Text>
                    </div>
                    <Button
                      variant="outline"
                      leftSection={<IconRefresh size={16} />}
                      onClick={() => clear()}
                    >
                      Clear Filters
                    </Button>
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export default ListingDiscoveryPage;
