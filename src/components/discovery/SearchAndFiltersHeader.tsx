import {
  ActionIcon,
  Button,
  Center,
  Chip,
  Drawer,
  FocusTrap,
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
  IconLayoutGrid,
  IconLayoutList,
  IconResize,
  IconSearch,
  IconSortDescending,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import { useListingFilterParams } from "../../hooks";
import { Listing, ListingFilterParams } from "../../types";
import { PAGE_SIZES, SORT_OPTIONS } from "../../utils/constants";
import { FilterContent } from "./FilterContent";

const SearchAndFiltersHeader = ({ listings }: { listings: Array<Listing> }) => {
  const [params, setParams, clear] = useListingFilterParams();
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);

  return (
    <>
      <Paper p="lg" radius="md" shadow="sm" withBorder>
        <Stack gap="md">
          {/* Search Bar */}
          <FocusTrap active>
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
                  <ActionIcon variant="subtle" onClick={() => clear("search")}>
                    <IconX size={16} />
                  </ActionIcon>
                )
              }
              autoFocus
              data-autofocus
            />
          </FocusTrap>

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
                clearable
                data={SORT_OPTIONS}
                w={180}
                onClear={() => clear("sortBy")}
              />
              <Select
                placeholder={"Page size"}
                leftSection={<IconResize size={16} />}
                value={params.pageSize ? params.pageSize.toString() : undefined}
                onChange={(value) =>
                  setParams({ pageSize: value ? Number(value) : 12 })
                }
                data={PAGE_SIZES}
                w={180}
                onClear={() => clear("pageSize")}
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
                        <IconLayoutGrid />
                      </Center>
                    ),
                    value: "grid",
                  },
                  {
                    label: (
                      <Center>
                        <IconLayoutList />
                      </Center>
                    ),
                    value: "list",
                  },
                ]}
              />
            </Group>
          </Group>

          {/* Active Filters Chips */}
          {/* {activeFiltersCount > 0 && ( */}
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Active filters:
            </Text>
            {params.type && (
              <Chip checked onChange={() => clear("type")} size="xs">
                {params.type}
              </Chip>
            )}
            {/* {selectedLocations.map((location) => (
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
            ))} */}
            {/* {featuredOnly && (
              <Chip checked onChange={() => setFeaturedOnly(false)} size="sm">
                Featured Only
              </Chip>
            )} */}
            <Button
              variant="subtle"
              size="xs"
              leftSection={<IconX size={12} />}
              onClick={() => clear()}
            >
              Clear All
            </Button>
          </Group>
          {/* )} */}
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
