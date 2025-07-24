import { handleApiErrors } from "@hive/esm-core-api";
import { InputSkeleton, When } from "@hive/esm-core-components";
import {
  Alert,
  Checkbox,
  Fieldset,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useFinancingOptions, useOwnershipTypes } from "../../hooks";
import { Listing, ListingFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
import SaleListingFinancialOptionsInput from "./SaleListingFinancialOptionsInput";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  listing?: Listing;
};

const SalesListingFormInput: FC<Props> = ({ onNext, onPrev, listing }) => {
  const form = useFormContext<ListingFormData>();
  const ownershipTypesAsync = useOwnershipTypes();
  const financingOptionsAsync = useFinancingOptions();
  return (
    <Fieldset legend="Sales Details">
      <Stack gap={"md"}>
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

        {!!!listing && <SaleListingFinancialOptionsInput />}
      </Stack>
    </Fieldset>
  );
};

export default SalesListingFormInput;
