import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Paper, Stack, Stepper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useListingApi } from "../hooks";
import { Listing, ListingFormData } from "../types";
import { ListingSchema } from "../utils/validation";
import ListingBasicDetailsFormSection from "./steps/ListingBasicDetailsFormSection";
import ListingMediaUploadsFormStep from "./steps/ListingMediaUploadsFormStep";
import { FileWithPath } from "@mantine/dropzone";
import ListingPropertyFormStep from "./steps/ListingPropertyFormStep";

type ListingFormProps = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  onCloseWorkspace?: () => void;
};
const STEPS = 4;
const ListingForm: FC<ListingFormProps> = ({
  onCloseWorkspace,
  listing,
  onSuccess,
}) => {
  const { addListing, updateListing, searchProperty } = useListingApi();
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
  const [active, setActive] = useState(2);
  const nextStep = () => setActive((current) => current + 1);
  const prevStep = () => setActive((current) => current - 1);
  const ltypesObservable = form.watch("types");
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
              <ListingPropertyFormStep onNext={nextStep} onPrev={prevStep} />
            </Stepper.Step>
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
