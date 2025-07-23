import {
  cleanFiles,
  handleApiErrors,
  mutate,
  uploadFiles,
} from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Tabs } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { FC, useCallback, useState } from "react";
import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useListingApi } from "../hooks";
import { Listing, ListingFormData } from "../types";
import { ListingSchema } from "../utils/validation";
import ListingBasicDetailsFormSection from "./steps/ListingBasicDetailsFormSection";
import ListingMediaUploadsFormStep from "./steps/ListingMediaUploadsFormStep";
import ListingPropertyFormStep from "./steps/ListingPropertyFormStep";
import ListingTypeDetailsStep from "./steps/ListingTypeDetailsStep";

type ListingFormProps = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  onCloseWorkspace?: () => void;
};

type FormSteps = "basic" | "upload" | "property" | "type-details";

const ListingForm: FC<ListingFormProps> = ({
  onCloseWorkspace,
  listing,
  onSuccess,
}) => {
  const { addListing, updateListing, addListingMedia } = useListingApi();

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
      type: listing?.type,
    },
    resolver: zodResolver(ListingSchema),
  });

  const isMobile = useMediaQuery("(max-width: 48em)");
  const [activeTab, setActiveTab] = useState<FormSteps | null>("basic");

  // Extract error navigation logic into a separate function
  const navigateToErrorStep = useCallback(() => {
    const fieldSteps: Record<FormSteps, Array<FieldPath<ListingFormData>>> = {
      basic: ["title", "description", "tags", "expiryDate"],
      upload: ["coverImage"],
      property: ["propertyId", "contactPersonId", "price", "additionalCharges"],
      "type-details": [
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
      ],
    };

    for (const [step, fields] of Object.entries(fieldSteps)) {
      const hasError = fields.some(
        (field) => form.getFieldState(field as any).invalid
      );

      if (hasError) {
        setActiveTab(step as FormSteps);
        break;
      }
    }
  }, [form]);
  // Navigate to error step when form errors change
  React.useEffect(() => {
    if (Object.keys(form.formState.errors ?? {}).length > 0) {
      navigateToErrorStep();
    }
  }, [form.formState.errors, navigateToErrorStep]);

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    try {
      const res = listing
        ? await updateListing(listing?.id, data)
        : await addListing(data);
      // Upload cover images or galary if any
      if (files.length > 0 || galaryImages.length > 0) {
        const _files = await uploadFiles({
          path: "listings/images",
          files: { coverImage: files, galaryImages },
        });
        const cover = _files["coverImage"];
        const galary = _files["galaryImages"];
        if (cover.length > 0) {
          // Update cover and clean old cover
          await updateListing(res.id, { coverImage: cover[0].path });
          if (res.coverImage) await cleanFiles([res.coverImage]);
        }
        if (galary.length > 0) {
          // No cleaning since this only occurs on creation of listing
          for (const g of galary) {
            await addListingMedia(res.id, {
              url: g.path,
              mediaType: "IMAGE",
              metadata: {
                id: g.id,
                size: Number(g.bytesSize),
                memeType: g.memeType,
              },
            });
          }
        }
      }

      onSuccess?.(res);
      onCloseWorkspace?.();
      mutate("/listings");
      showNotification({
        title: "Success",
        message: `Listing ${listing ? "updated" : "created"} successfully`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<ListingFormData>(error);
      if (e.detail) {
        showNotification({ title: "Error", message: e.detail, color: "red" });
      } else {
        // Set all backend validation errors
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof ListingFormData, { message: val })
        );

        // Navigate to error step after setting errors
        // Use setTimeout to ensure React Hook Form state is updated
        setTimeout(() => {
          // Without setTimeout - runs immediately in same stack:
          navigateToErrorStep();
        }, 0);
      }
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
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            variant="default"
            h={"100%"}
            value={activeTab}
            onChange={(value) => {
              setActiveTab(value as FormSteps);
            }}
          >
            <Tabs.List justify={isMobile ? "space-between" : undefined}>
              <Tabs.Tab p={"lg"} value={"basic"}>
                Basics
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"type-details"}>
                Type
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"upload"}>
                Uploads
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"property"}>
                Property
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"basic"} p={"sm"}>
              <ListingBasicDetailsFormSection
                onCancel={onCloseWorkspace}
                onNext={() => setActiveTab("type-details")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"type-details"} p={"sm"}>
              <ListingTypeDetailsStep
                onPrev={() => setActiveTab("basic")}
                onNext={() => setActiveTab("upload")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"upload"} p={"sm"}>
              <ListingMediaUploadsFormStep
                onPrev={() => setActiveTab("type-details")}
                onNext={() => setActiveTab("property")}
                coverImages={files}
                galaryImages={galaryImages}
                onCoverImagesChange={setFiles}
                onGalaryImagesChange={setGalarayImages}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"property"} p={"sm"}>
              <ListingPropertyFormStep onPrev={() => setActiveTab("upload")} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default ListingForm;
