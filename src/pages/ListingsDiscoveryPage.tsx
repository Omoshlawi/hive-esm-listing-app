"use client";

import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Pagination,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHome, IconRefresh } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import { ListingRow } from "../components/discovery";
import { FilterContent } from "../components/discovery/FilterContent";
import { ListingCard } from "../components/discovery/ListingCard";
import SearchAndFiltersHeader from "../components/discovery/SearchAndFiltersHeader";
import { useListingFilterParams, useListings } from "../hooks";

// Mock data for listings
const mockListings = [
  {
    id: "1",
    title: "Luxury Downtown Penthouse",
    description: "Stunning penthouse with panoramic city views",
    price: 1250000,
    type: "SALE",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Downtown",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 2400,
    featured: true,
    listedDate: "2024-01-15T00:00:00Z",
    views: 1247,
    agent: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
    },
    tags: ["luxury", "penthouse", "city-view"],
  },
  {
    id: "2",
    title: "Modern Family Home",
    description: "Beautiful family home in quiet neighborhood",
    price: 850000,
    type: "SALE",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Suburbs",
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 3200,
    featured: false,
    listedDate: "2024-01-20T00:00:00Z",
    views: 892,
    agent: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 987-6543",
    },
    tags: ["family", "modern", "garden"],
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    description: "Perfect starter home in trendy area",
    price: 2500,
    type: "RENT",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Midtown",
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 650,
    featured: false,
    listedDate: "2024-01-18T00:00:00Z",
    views: 456,
    agent: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 456-7890",
    },
    tags: ["studio", "trendy", "affordable"],
  },
  {
    id: "4",
    title: "Waterfront Villa",
    description: "Exclusive waterfront property with private beach",
    price: 2750000,
    type: "SALE",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Waterfront",
    bedrooms: 5,
    bathrooms: 4.5,
    squareFootage: 4800,
    featured: true,
    listedDate: "2024-01-10T00:00:00Z",
    views: 2134,
    agent: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 234-5678",
    },
    tags: ["waterfront", "luxury", "exclusive"],
  },
  {
    id: "5",
    title: "Urban Loft",
    description: "Industrial-style loft in arts district",
    price: 3200,
    type: "RENT",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Arts District",
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1800,
    featured: false,
    listedDate: "2024-01-22T00:00:00Z",
    views: 678,
    agent: {
      name: "Lisa Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 345-6789",
    },
    tags: ["loft", "industrial", "arts"],
  },
  {
    id: "6",
    title: "Suburban Townhouse",
    description: "Spacious townhouse with garage and yard",
    price: 650000,
    type: "SALE",
    status: "APPROVED",
    coverImage: "/placeholder.svg?height=300&width=400",
    location: "Suburbs",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 2200,
    featured: false,
    listedDate: "2024-01-25T00:00:00Z",
    views: 543,
    agent: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 567-8901",
    },
    tags: ["townhouse", "garage", "yard"],
  },
];

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
                  {/* {totalPages > 1 && (
                    <Group justify="center" mt="xl">
                      <Pagination
                        value={currentPage}
                        onChange={setCurrentPage}
                        total={totalPages}
                        size="md"
                        withEdges
                      />
                    </Group>
                  )} */}
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
