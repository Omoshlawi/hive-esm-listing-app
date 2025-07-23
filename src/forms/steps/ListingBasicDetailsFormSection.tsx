import {
  Button,
  Group,
  Stack,
  TagsInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";

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
          name="title"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Title"
              inputWrapperOrder={INPUT_ORDER}
              description="Should be descriptive and catchy for marketing purposes"
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
              description="helpfull in listing discovery during search"
              inputWrapperOrder={INPUT_ORDER}
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
              description="Must be a future date"
              inputWrapperOrder={INPUT_ORDER}
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
