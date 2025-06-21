import {
  Stack,
  SegmentedControl,
  MultiSelect,
  NumberFormatter,
  RangeSlider,
  Button,
  Collapse,
  Divider,
  Text,
  Switch,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustments,
  IconChevronUp,
  IconChevronDown,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useListingFilterParams } from "../../hooks";
import { LISTING_TYPES } from "../../utils/constants";
import { Listing } from "../../types";

const locations = [
  "Downtown",
  "Suburbs",
  "Midtown",
  "Waterfront",
  "Arts District",
];
const propertyTypes = [
  "House",
  "Apartment",
  "Condo",
  "Townhouse",
  "Villa",
  "Studio",
];
const amenities = [
  "Pool",
  "Gym",
  "Parking",
  "Garden",
  "Balcony",
  "Fireplace",
  "AC",
  "Heating",
];

export const FilterContent = () => {
  const [params, setParams, clear] = useListingFilterParams();
  const [advancedFiltersOpen, { toggle: toggleAdvancedFiltersOpen }] =
    useDisclosure(false);

  // filter states
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

  return (
    <Stack gap="md">
      {/* Listing Type */}
      <div>
        <Select
          value={params.type}
          onChange={(value: Listing["type"]) => {
            setParams({ type: value || undefined });
          }}
          data={LISTING_TYPES}
          placeholder="Select listing type"
          limit={10}
          label="Listing type"
          nothingFoundMessage="Nothing found..."
          clearable
          onClear={() => clear("type")}
        />
      </div>

      {/* Location */}
      <div>
        <Text size="sm" fw={500} mb="xs">
          Location
        </Text>
        <MultiSelect
          placeholder="Select locations"
          data={locations}
          value={selectedLocations}
          onChange={setSelectedLocations}
          clearable
        />
      </div>

      {/* Price Range */}
      <div>
        <Text size="sm" fw={500} mb="xs">
          Price Range:{" "}
          <NumberFormatter
            value={priceRange[0]}
            prefix="Ksh."
            thousandSeparator
          />{" "}
          -{" "}
          <NumberFormatter
            value={priceRange[1]}
            prefix="Ksh."
            thousandSeparator
          />
        </Text>
        <RangeSlider
          value={priceRange}
          onChange={setPriceRange}
          min={0}
          max={3000000}
          step={50000}
          marks={[
            { value: 0, label: "Ksh.0" },
            { value: 1500000, label: "Ksh.1.5M" },
            { value: 3000000, label: "Ksh.3M" },
          ]}
        />
      </div>

      {/* Advanced Filters Toggle */}
      <Button
        variant="subtle"
        leftSection={<IconAdjustments size={16} />}
        rightSection={
          advancedFiltersOpen ? (
            <IconChevronUp size={16} />
          ) : (
            <IconChevronDown size={16} />
          )
        }
        onClick={toggleAdvancedFiltersOpen}
        fullWidth
      >
        Advanced Filters
      </Button>

      <Collapse in={advancedFiltersOpen}>
        <Stack gap="md">
          {/* Bedrooms */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              Bedrooms: {bedroomRange[0]} - {bedroomRange[1]}
            </Text>
            <RangeSlider
              value={bedroomRange}
              onChange={setBedroomRange}
              min={1}
              max={5}
              step={1}
              marks={[
                { value: 1, label: "1" },
                { value: 3, label: "3" },
                { value: 5, label: "5+" },
              ]}
            />
          </div>

          {/* Bathrooms */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              Bathrooms: {bathroomRange[0]} - {bathroomRange[1]}
            </Text>
            <RangeSlider
              value={bathroomRange}
              onChange={setBathroomRange}
              min={1}
              max={5}
              step={0.5}
              marks={[
                { value: 1, label: "1" },
                { value: 3, label: "3" },
                { value: 5, label: "5+" },
              ]}
            />
          </div>

          {/* Square Footage */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              Square Footage: {squareFootageRange[0].toLocaleString()} -{" "}
              {squareFootageRange[1].toLocaleString()} sq ft
            </Text>
            <RangeSlider
              value={squareFootageRange}
              onChange={setSquareFootageRange}
              min={500}
              max={5000}
              step={100}
              marks={[
                { value: 500, label: "500" },
                { value: 2750, label: "2.7K" },
                { value: 5000, label: "5K+" },
              ]}
            />
          </div>

          {/* Property Types */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              Property Type
            </Text>
            <MultiSelect
              placeholder="Select property types"
              data={propertyTypes}
              value={selectedPropertyTypes}
              onChange={setSelectedPropertyTypes}
              clearable
            />
          </div>

          {/* Amenities */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              Amenities
            </Text>
            <MultiSelect
              placeholder="Select amenities"
              data={amenities}
              value={selectedAmenities}
              onChange={setSelectedAmenities}
              clearable
            />
          </div>

          {/* Featured Only */}
          <Switch
            label="Featured properties only"
            checked={featuredOnly}
            onChange={(event) => setFeaturedOnly(event.currentTarget.checked)}
          />
        </Stack>
      </Collapse>

      <Divider />

      {/* Clear Filters */}
      <Button
        variant="outline"
        color="red"
        leftSection={<IconX size={16} />}
        // onClick={clearAllFilters}
        // disabled={activeFiltersCount === 0}
        fullWidth
      >
        {/* Clear All Filters ({activeFiltersCount}) */}
      </Button>
    </Stack>
  );
};
