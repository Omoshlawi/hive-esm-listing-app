import {
  Button,
  Checkbox,
  Group,
  NumberInput,
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
const LeaseListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Lease Details
        </Title>
        <Controller
          control={form.control}
          name="leaseDetails.leaseTerm"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Lease term"
              error={fieldState.error?.message}
              placeholder=""
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
              placeholder="In Ksh."
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
              "leaseDetails.leaseTerm",
              "leaseDetails.renewalAllowed",
              "leaseDetails.securityDeposit",
              "leaseDetails.renewalOptions.maxRenewals",
              "leaseDetails.renewalOptions.renewalAllowed",
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

export default LeaseListingFormStep;
