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
  useMantineTheme
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
  const { error, isLoading, listings } = useListings();
  const [params, setParams] = useListingFilterParams();
  const theme = useMantineTheme();
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [listingType, setListingType] = useState<string | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    []
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [bedroomRange, setBedroomRange] = useState<[number, number]>([1, 5]);
  const [bathroomRange, setBathroomRange] = useState<[number, number]>([1, 5]);
  const [squareFootageRange, setSquareFootageRange] = useState<
    [number, number]
  >([500, 5000]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Active filters count
  const activeFiltersCount = [
    listingType,
    selectedLocations.length > 0,
    selectedPropertyTypes.length > 0,
    selectedAmenities.length > 0,
    priceRange[0] > 0 || priceRange[1] < 3000000,
    bedroomRange[0] > 1 || bedroomRange[1] < 5,
    bathroomRange[0] > 1 || bathroomRange[1] < 5,
    squareFootageRange[0] > 500 || squareFootageRange[1] < 5000,
    featuredOnly,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery("");
    setListingType(null);
    setSelectedLocations([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setPriceRange([0, 3000000]);
    setBedroomRange([1, 5]);
    setBathroomRange([1, 5]);
    setSquareFootageRange([500, 5000]);
    setFeaturedOnly(false);
    setCurrentPage(1);
  };

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
              <Group justify="space-between" mb="md">
                <Text fw={500}>Filters</Text>
                {activeFiltersCount > 0 && (
                  <Badge size="sm" color={theme.primaryColor}>
                    {activeFiltersCount}
                  </Badge>
                )}
              </Group>
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
                  <ListingsPagination listings={listings} />
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
                      onClick={clearAllFilters}
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
