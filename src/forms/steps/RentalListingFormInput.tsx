import { Fieldset, NumberInput, Select, Stack, TagsInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const RentalListingFormInput: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Fieldset legend="Rental Details">
      <Stack gap={"md"}>
        <Controller
          control={form.control}
          name="rentalDetails.rentPeriod"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Rental period"
              data={["Monthly", "Weekly", "Daily", "Yearly"]}
              error={fieldState.error?.message}
              placeholder="Select period"
            />
          )}
        />
        <Controller
          control={form.control}
          name="rentalDetails.minimumStay"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Minimum stay"
              error={fieldState.error?.message}
              placeholder="In specified period"
            />
          )}
        />
        <Controller
          control={form.control}
          name="rentalDetails.securityDeposit"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Security deposit"
              error={fieldState.error?.message}
              placeholder="Enter security deposit"
              inputWrapperOrder={INPUT_ORDER}
              description="In Ksh."
            />
          )}
        />

        <Controller
          control={form.control}
          name="rentalDetails.utilities"
          render={({ field, fieldState }) => (
            <TagsInput
              {...field}
              label="Utilities"
              error={fieldState.error?.message}
              placeholder="e.g Wifi, Entertainment, e.t.c"
            />
          )}
        />
        <Controller
          control={form.control}
          name="rentalDetails.availableFrom"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Available from"
              error={fieldState.error?.message}
              placeholder="dd/mm/yyyy"
            />
          )}
        />
      </Stack>
    </Fieldset>
  );
};

export default RentalListingFormInput;
