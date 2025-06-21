import {
  ActionIcon,
  Button,
  Center,
  Drawer,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFilter,
  IconGrid3x3,
  IconList,
  IconSearch,
  IconSortDescending,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import { useListingFilterParams } from "../../hooks";
import { Listing, ListingFilterParams } from "../../types";
import { FilterContent } from "./FilterContent";

const SearchAndFiltersHeader = ({ listings }: { listings: Array<Listing> }) => {
  const [params, setParams] = useListingFilterParams();
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);

  return (
    <>
      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md">
          {/* Search Bar */}
          <TextInput
            placeholder="Search by title, description, or location..."
            leftSection={<IconSearch size={16} />}
            value={params.search}
            onChange={(event) =>
              setParams({ search: event.currentTarget.value })
            }
            size="md"
            rightSection={
              params.search && (
                <ActionIcon
                  variant="subtle"
                  onClick={() => setParams({ search: "" })}
                >
                  <IconX size={16} />
                </ActionIcon>
              )
            }
          />

          {/* Controls Row */}
          <Group justify="space-between" wrap="wrap">
            <Group gap="md">
              {/* Mobile Filter Button */}
              <Button
                leftSection={<IconFilter size={16} />}
                variant="outline"
                onClick={openFilters}
                hiddenFrom={"md"}
              >
                Filters{" "}
                {/*{activeFiltersCount > 0 && `(${activeFiltersCount})`}*/}
              </Button>

              {/* Results Count */}
              <Text size="sm" c="dimmed">
                {listings.length} properties found
              </Text>
            </Group>

            <Group gap="md">
              {/* Sort */}
              <Select
                placeholder="Sort by"
                leftSection={<IconSortDescending size={16} />}
                value={params.sortBy}
                onChange={(value: ListingFilterParams["sortBy"]) =>
                  setParams({ sortBy: value || "newest" })
                }
                data={[
                  { value: "newest", label: "Newest First" },
                  { value: "oldest", label: "Oldest First" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "views", label: "Most Viewed" },
                ]}
                w={180}
              />

              {/* View Toggle */}
              <SegmentedControl
                value={params.view}
                onChange={(value: "grid" | "list") =>
                  setParams({ view: value })
                }
                data={[
                  {
                    label: (
                      <Center>
                        <IconGrid3x3 size={16} />
                      </Center>
                    ),
                    value: "grid",
                  },
                  {
                    label: (
                      <Center>
                        <IconList size={16} />
                      </Center>
                    ),
                    value: "list",
                  },
                ]}
              />
            </Group>
          </Group>

          {/* Active Filters Chips */}
          {/* {activeFiltersCount > 0 && (
            <Group gap="xs">
              <Text size="sm" fw={500}>
                Active filters:
              </Text>
              {listingType && (
                <Chip checked onChange={() => setListingType(null)} size="sm">
                  {listingType}
                </Chip>
              )}
              {selectedLocations.map((location) => (
                <Chip
                  key={location}
                  checked
                  onChange={() =>
                    setSelectedLocations((prev) =>
                      prev.filter((l) => l !== location)
                    )
                  }
                  size="sm"
                >
                  {location}
                </Chip>
              ))}
              {featuredOnly && (
                <Chip checked onChange={() => setFeaturedOnly(false)} size="sm">
                  Featured Only
                </Chip>
              )}
              <Button
                variant="subtle"
                size="xs"
                leftSection={<IconX size={12} />}
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            </Group>
          )} */}
        </Stack>
      </Paper>
      <Drawer
        opened={filtersOpened}
        onClose={closeFilters}
        title="Filters"
        padding="lg"
        size="sm"
      >
        <FilterContent />
      </Drawer>
    </>
  );
};

export default SearchAndFiltersHeader;
