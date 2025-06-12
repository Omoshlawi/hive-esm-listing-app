import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Stepper } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useListingApi, useSearchProperties } from "../hooks";
import { Listing, ListingFormData } from "../types";
import { ListingSchema } from "../utils/validation";
import ListingBasicDetailsFormSection from "./steps/ListingBasicDetailsFormSection";
import ListingMediaUploadsFormStep from "./steps/ListingMediaUploadsFormStep";
import ListingPropertyFormStep from "./steps/ListingPropertyFormStep";
import RentalListingFormStep from "./steps/RentalListingFormStep";
import SalesListingFormStep from "./steps/SalesListingFormStep";
import AuctionListingFormStep from "./steps/AuctionListingFormStep";
import LeaseListingFormStep from "./steps/LeaseListingFormStep";

type ListingFormProps = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  onCloseWorkspace?: () => void;
};
const ListingForm: FC<ListingFormProps> = ({
  onCloseWorkspace,
  listing,
  onSuccess,
}) => {
  const { addListing, updateListing, searchProperty } = useListingApi();
  //   decleared here at the root instead of the step component to retain search result
  //  for the propery important in displaying when user move back to the step from another
  const { properties, isLoading, setSearch, search } = useSearchProperties();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [galaryImages, setGalarayImages] = useState<FileWithPath[]>([]);
  const form = useForm<ListingFormData>({
    defaultValues: {
      title: listing?.title,
      description: listing?.description,
      expiryDate: listing?.expiryDate,
      featured: listing?.featured,
      tags: listing?.tags ?? [],
      price: listing?.price ? Number(listing.price) : undefined,
      //   propertyId: property.id,
      types: [],
    },
    resolver: zodResolver(ListingSchema),
  });
  const ltypesObservable = form.watch("types");

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => current + 1);
  const prevStep = () => setActive((current) => current - 1);
  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    try {
      const res = listing
        ? await updateListing(listing?.id, data)
        : await addListing(data);
      onSuccess?.(res.data);
      onCloseWorkspace?.();
      mutate("/listings");
      showNotification({
        title: "succes",
        message: `listings ${listing ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<ListingFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof ListingFormData, { message: val })
        );
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper p={"md"} flex={1} h={"100%"}>
          <Stepper
            h={"100%"}
            flex={1}
            styles={{
              content: {
                // height: "97%",
              },
            }}
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
            size="xs"
            orientation="horizontal"
          >
            <Stepper.Step label="Basics" description="Basic information">
              <ListingBasicDetailsFormSection
                onCancel={onCloseWorkspace}
                onNext={nextStep}
              />
            </Stepper.Step>
            <Stepper.Step label="Uploads" description="Listing uploads">
              <ListingMediaUploadsFormStep
                onNext={nextStep}
                onPrev={prevStep}
                coverImages={files}
                onCoverImagesChange={setFiles}
                galaryImages={galaryImages}
                onGalaryImagesChange={setGalarayImages}
              />
            </Stepper.Step>
            <Stepper.Step label="Property" description="Listing property">
              <ListingPropertyFormStep
                onNext={nextStep}
                onPrev={prevStep}
                isLoadingProperties={isLoading}
                onPropertySearchChange={setSearch}
                propertiesSearchresults={properties}
                propertySearchValue={search}
              />
            </Stepper.Step>
            {ltypesObservable.includes("rent") && (
              <Stepper.Step label="Rentals" description="Rental information">
                <RentalListingFormStep onNext={nextStep} onPrev={prevStep} />
              </Stepper.Step>
            )}
            {ltypesObservable.includes("sale") && (
              <Stepper.Step label="Sales" description="Sales information">
                <SalesListingFormStep onNext={nextStep} onPrev={prevStep} />
              </Stepper.Step>
            )}
            {ltypesObservable.includes("auction") && (
              <Stepper.Step label="Action" description="Auction information">
                <AuctionListingFormStep onNext={nextStep} onPrev={prevStep} />
              </Stepper.Step>
            )}
            {ltypesObservable.includes("lease") && (
              <Stepper.Step label="Lease" description="Lease information">
                <LeaseListingFormStep onNext={nextStep} onPrev={prevStep} />
              </Stepper.Step>
            )}
            <Stepper.Step label="Submit" description="Submit and save">
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default ListingForm;
