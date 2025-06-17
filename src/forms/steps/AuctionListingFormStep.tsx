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
import { INPUT_ORDER } from "../../utils/constants";
import { DateInput } from "@mantine/dates";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const AuctionListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Auction details
        </Title>
        <Controller
          control={form.control}
          name="auctionDetails.startingBid"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Auction start price"
              error={fieldState.error?.message}
              placeholder="Start price in Ksh."
              description="The lowest possible bid a buyer can place."
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="auctionDetails.reservePrice"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Reserve price"
              error={fieldState.error?.message}
              placeholder="Start price in Ksh."
              description="The minimum amount the seller is willing to accept."
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="auctionDetails.bidIncrement"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Bid increment"
              error={fieldState.error?.message}
              placeholder="Increment"
              description="Minimum increase per bid"
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="auctionDetails.auctionStart"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Action start date"
              error={fieldState.error?.message}
              placeholder="dd/mm/yyy"
              description="Must be a future date"
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="auctionDetails.auctionEnd"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Action end date"
              error={fieldState.error?.message}
              placeholder="dd/mm/yyy"
              description="Must be a future date"
              inputWrapperOrder={INPUT_ORDER}
            />
          )}
        />
        <Controller
          control={form.control}
          name="auctionDetails.requireBidderApproval"
          render={({ field, fieldState }) => (
            <Checkbox
              label="Require bidder approval?"
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
          name="auctionDetails.requirePreRegistration"
          render={({ field, fieldState }) => (
            <Checkbox
              label="Require pre-registration?"
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
          onClick={onNext}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default AuctionListingFormStep;
