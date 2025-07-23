import { Alert, Checkbox, Fieldset, NumberInput, Stack } from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
type Props = {};
const LeaseListingFormInput: FC<Props> = ({}) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Fieldset legend="Lease Details">
      <Stack gap={"md"}>
        {form.formState?.errors?.leaseDetails?.message && (
          <Alert color="red" variant="light" title="Lease error">
            {form.formState?.errors?.leaseDetails?.message}
          </Alert>
        )}
        <Controller
          control={form.control}
          name="leaseDetails.leaseTermInMoths"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Lease term"
              error={fieldState.error?.message}
              placeholder="Enter lease terms"
              description="In months"
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="leaseDetails.securityDeposit"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Security deposit"
              error={fieldState.error?.message}
              inputWrapperOrder={INPUT_ORDER}
              description="Amount in Ksh"
              placeholder="Enter deposit"
            />
          )}
        />
        <Controller
          control={form.control}
          name="leaseDetails.renewalAllowed"
          render={({ field, fieldState }) => (
            <Checkbox
              label="Renewals allowed?"
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
      </Stack>
    </Fieldset>
  );
};

export default LeaseListingFormInput;
