import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  TagsInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const RentalListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Rental details
        </Title>
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
          name="rentalDetails.minimStay"
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
              placeholder="In Ksh."
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
              "rentalDetails.availableFrom",
              "rentalDetails.minimStay",
              "rentalDetails.rentPeriod",
              "rentalDetails.utilities",
              "rentalDetails.securityDeposit",
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

export default RentalListingFormStep;
