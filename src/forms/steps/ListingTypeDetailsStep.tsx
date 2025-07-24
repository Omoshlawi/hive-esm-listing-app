import { Stack, Title, Group, Button, Select } from "@mantine/core";
import React, { FC } from "react";
import { Listing, ListingFormData } from "../../types";
import { Controller, useFormContext } from "react-hook-form";
import { LISTING_TYPES } from "../../utils/constants";
import AuctionListingFormInput from "./AuctionListingFormInput";
import LeaseListingFormInput from "./LeaseListingFormInput";
import RentalListingFormInput from "./RentalListingFormInput";
import SalesListingFormInput from "./SalesListingFormInput";

type Props = {
  onPrev?: () => void;
  onNext?: () => void;
  listing?: Listing;
};

const ListingTypeDetailsStep: FC<Props> = ({ onPrev, onNext, listing }) => {
  const form = useFormContext<ListingFormData>();
  const ltypesObservable = form.watch("type");

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Listing Type Details
        </Title>
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              readOnly={Boolean(listing)}
              data={LISTING_TYPES}
              placeholder="Select listing type"
              limit={10}
              label="Listing type"
              searchable
              error={error?.message}
              nothingFoundMessage="Nothing found..."
              clearable
            />
          )}
        />
        {ltypesObservable === "AUCTION" && <AuctionListingFormInput />}
        {ltypesObservable === "LEASE" && <LeaseListingFormInput />}
        {ltypesObservable === "RENTAL" && <RentalListingFormInput />}
        {ltypesObservable === "SALE" && (
          <SalesListingFormInput listing={listing} />
        )}
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
              "type",

              "rentalDetails",
              "rentalDetails.availableFrom",
              "rentalDetails.furnished",
              "rentalDetails.minimumStay",
              "rentalDetails.rentPeriod",
              "rentalDetails.securityDeposit",
              "rentalDetails.utilities",

              "saleDetails",
              "saleDetails.downPayment",
              "saleDetails.financingOptions",
              "saleDetails.ownershipTypeId",
              "saleDetails.priceNegotiable",
              "saleDetails.titleDeedReady",

              "auctionDetails",
              "auctionDetails.auctionEnd",
              "auctionDetails.auctionStart",
              "auctionDetails.bidIncrement",
              "auctionDetails.requireBidderApproval",
              "auctionDetails.requirePreRegistration",
              "auctionDetails.reservePrice",
              "auctionDetails.startingBid",

              "leaseDetails",
              "leaseDetails.allowedUses",
              "leaseDetails.leaseTermInMoths",
              "leaseDetails.renewalAllowed",
              "leaseDetails.securityDeposit",
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

export default ListingTypeDetailsStep;
