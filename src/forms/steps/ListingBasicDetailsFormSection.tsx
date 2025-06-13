import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Stack,
  TagsInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { LISTING_TYPES } from "../../utils/constants";

type Props = {
  onNext?: () => void;
  onCancel?: () => void;
};

const ListingBasicDetailsFormSection: FC<Props> = ({ onCancel, onNext }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Listing Basic Information
        </Title>
        <Controller
          control={form.control}
          name="types"
          render={({ field, fieldState: { error } }) => (
            <MultiSelect
              {...field}
              data={LISTING_TYPES}
              placeholder="Select types"
              limit={10}
              label="Property types"
              searchable
              error={error?.message}
              nothingFoundMessage="Nothing found..."
              hidePickedOptions
              clearable
            />
          )}
        />
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Name"
              error={fieldState.error?.message}
              placeholder="Listing title"
            />
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              value={field.value as string}
              placeholder="Description ..."
              label="Description"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="tags"
          render={({ field, fieldState }) => (
            <TagsInput
              {...field}
              label="Tags"
              error={fieldState.error?.message}
              placeholder="Enter key words"
            />
          )}
        />
        <Controller
          control={form.control}
          name="expiryDate"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Expiry date"
              error={fieldState.error?.message}
              placeholder="dd/mm/yyyy"
            />
          )}
        />
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onCancel}>
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
            const valid = await form.trigger([
              "title",
              "description",
              "tags",
              "types",
              "expiryDate",
            ]);
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default ListingBasicDetailsFormSection;
