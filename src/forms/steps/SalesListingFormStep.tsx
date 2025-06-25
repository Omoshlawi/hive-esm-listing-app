import {
  Alert,
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
import { INPUT_ORDER } from "../../utils/constants";
import { useFinancingOptions, useOwnershipTypes } from "../../hooks";
import { InputSkeleton, When } from "@hive/esm-core-components";
import { handleApiErrors } from "@hive/esm-core-api";
import SaleListingFinancialOptionsInput from "./SaleListingFinancialOptionsInput";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};

const SalesListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  const ownershipTypesAsync = useOwnershipTypes();
  const financingOptionsAsync = useFinancingOptions();
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
              placeholder="Enter down payment"
              inputWrapperOrder={INPUT_ORDER}
              description="In Ksh."
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
          name="saleDetails.ownershipTypeId"
          render={({ field, fieldState }) => (
            <When
              asyncState={ownershipTypesAsync}
              loading={() => <InputSkeleton />}
              error={(e) => (
                <Alert color="red" title="Error loading ownership types">
                  {handleApiErrors(e).detail}
                </Alert>
              )}
              success={(ownershipTypes) => (
                <Select
                  {...field}
                  data={ownershipTypes.map((type) => ({
                    label: type.name,
                    value: type.id,
                  }))}
                  placeholder="Select ownership type"
                  limit={10}
                  label="ownership type"
                  searchable
                  error={fieldState.error?.message}
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              )}
            />
          )}
        />

       <SaleListingFinancialOptionsInput/>
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
              "saleDetails.ownershipTypeId",
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
