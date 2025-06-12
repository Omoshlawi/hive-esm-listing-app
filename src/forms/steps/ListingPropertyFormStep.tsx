import {
  Button,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData, Property } from "../../types";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  propertiesSearchresults?: Array<Property>;
  isLoadingProperties?: boolean;
  propertySearchValue?: string;
  onPropertySearchChange?: (search: string) => void;
};

const ListingPropertyFormStep: FC<Props> = ({
  onPrev,
  onNext,
  isLoadingProperties,
  onPropertySearchChange,
  propertySearchValue,
  propertiesSearchresults = [],
}) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Listing Property
        </Title>
        <Controller
          control={form.control}
          name="propertyId"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              data={propertiesSearchresults.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
              placeholder="Select property to list"
              limit={10}
              rightSection={isLoadingProperties && <Loader size={"xs"} />}
              label="Property"
              searchable
              searchValue={propertySearchValue}
              onSearchChange={onPropertySearchChange}
              error={error?.message}
              nothingFoundMessage="Nothing found..."
              clearable
            />
          )}
        />
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Price"
              error={fieldState.error?.message}
              placeholder="Price in Ksh."
            />
          )}
        />
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onPrev}>
          Cancel
        </Button>
        <Button
          radius={0}
          flex={1}
          fullWidth
          type={"button"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          onClick={async () => {
            const valid = await form.trigger(["price", "propertyId"]);
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default ListingPropertyFormStep;
