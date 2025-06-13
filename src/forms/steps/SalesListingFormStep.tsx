import {
  Button,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};

const SalesListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Sales Details
        </Title>
        <Controller
          control={form.control}
          name="saleDetails.downPayment"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Down payment"
              error={fieldState.error?.message}
              placeholder="In Ksh."
            />
          )}
        />
        <Controller
          control={form.control}
          name="saleDetails.priceNegotiable"
          render={({ field, fieldState }) => (
            <Checkbox
              label="Price Negotable?"
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              error={fieldState.error?.message}
              ref={field.ref}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          control={form.control}
          name="saleDetails.titleDeedReady"
          render={({ field, fieldState }) => (
            <Checkbox
              label="Title Deed ready?"
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              error={fieldState.error?.message}
              ref={field.ref}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          control={form.control}
          name="saleDetails.ownershipType"
          render={({ field, fieldState }) => (
            <Radio.Group
              {...field}
              label="Select ownership type"
              error={fieldState.error?.message}
            >
              <Stack gap={"md"}>
                <Radio value="Freehold" label="Freehold" />
                <Radio value="Leasehold" label="Leasehold" />
              </Stack>
            </Radio.Group>
          )}
        />
        <Controller
          control={form.control}
          name="saleDetails.financingOptions"
          render={({ field, fieldState }) => (
            <MultiSelect
              {...field}
              data={["Cash", "Mortgage", "Installments"]}
              placeholder="Supported financing options"
              limit={10}
              label="Supported financing options"
              searchable
              error={fieldState.error?.message}
              nothingFoundMessage="Nothing found..."
              hidePickedOptions
              clearable
            />
          )}
        />
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onPrev}>
          Previous
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
              "saleDetails.downPayment",
              "saleDetails.financingOptions",
              "saleDetails.ownershipType",
              "saleDetails.priceNegotiable",
              "saleDetails.titleDeedReady",
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

export default SalesListingFormStep;
