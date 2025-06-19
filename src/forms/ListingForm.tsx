import {
  cleanFiles,
  handleApiErrors,
  mutate,
  uploadFiles,
} from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Stepper, Tabs } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState, useMemo, useCallback } from "react";
import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useListingApi, useSearchProperties } from "../hooks";
import { Listing, ListingFormData } from "../types";
import { ListingSchema } from "../utils/validation";
import AuctionListingFormStep from "./steps/AuctionListingFormStep";
import LeaseListingFormStep from "./steps/LeaseListingFormStep";
import ListingBasicDetailsFormSection from "./steps/ListingBasicDetailsFormSection";
import ListingMediaUploadsFormStep from "./steps/ListingMediaUploadsFormStep";
import ListingPropertyFormStep from "./steps/ListingPropertyFormStep";
import RentalListingFormStep from "./steps/RentalListingFormStep";
import SalesListingFormStep from "./steps/SalesListingFormStep";
import ListingSubmitStep from "./steps/ListingSubmitStep";
import { useSearchUser } from "../hooks/useUsers";

type ListingFormProps = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  onCloseWorkspace?: () => void;
};

type FormSteps =
  | "basic"
  | "upload"
  | "property"
  | "rent"
  | "sale"
  | "auction"
  | "lease"
  | "submit";

// Step configuration - easy to modify when adding new steps
const STEP_CONFIG = [
  {
    key: "basic" as FormSteps,
    label: "Basics",
    required: true,
  },
  {
    key: "upload" as FormSteps,
    label: "Uploads",
    required: true,
  },
  {
    key: "property" as FormSteps,
    label: "Property",
    required: true,
  },
  {
    key: "rent" as FormSteps,
    label: "Rent",
    condition: (type: ListingFormData["type"]) => type === "RENTAL",
  },
  {
    key: "sale" as FormSteps,
    label: "Sale",
    condition: (type: ListingFormData["type"]) => type === "SALE",
  },
  {
    key: "auction" as FormSteps,
    label: "Auction",
    condition: (type: ListingFormData["type"]) => type === "AUCTION",
  },
  {
    key: "lease" as FormSteps,
    label: "Lease",
    condition: (type: ListingFormData["type"]) => type === "LEASE",
  },
  {
    key: "submit" as FormSteps,
    label: "Submit",
    required: true,
  },
];

const ListingForm: FC<ListingFormProps> = ({
  onCloseWorkspace,
  listing,
  onSuccess,
}) => {
  const { addListing, updateListing, addListingMedia } = useListingApi();
  const {
    properties,
    isLoading: isLoadingProperties,
    searchProperty,
    search,
  } = useSearchProperties();
  const {
    users,
    isLoading: isLoadingUsers,
    searchUser,
    searchValue: userSearchValue,
  } = useSearchUser();

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

  const ltypesObservable = form.watch("type");
  const isMobile = useMediaQuery("(max-width: 48em)");
  const [activeTab, setActiveTab] = useState<FormSteps | null>("basic");

  // Calculate available steps based on configuration
  const availableSteps = useMemo(() => {
    return STEP_CONFIG.filter(
      (step) =>
        step.required || (step.condition && step.condition(ltypesObservable))
    ).map((step) => step.key);
  }, [ltypesObservable]);

  // Generic navigation functions
  const navigateToStep = useCallback(
    (direction: "next" | "prev") => {
      if (!activeTab) return;

      const currentIndex = availableSteps.indexOf(activeTab);
      const targetIndex =
        direction === "next" ? currentIndex + 1 : currentIndex - 1;

      if (targetIndex >= 0 && targetIndex < availableSteps.length) {
        setActiveTab(availableSteps[targetIndex]);
      }
    },
    [activeTab, availableSteps]
  );

  const navigateToNext = useCallback(
    () => navigateToStep("next"),
    [navigateToStep]
  );
  const navigateToPrev = useCallback(
    () => navigateToStep("prev"),
    [navigateToStep]
  );

  // Extract error navigation logic into a separate function
  const navigateToErrorStep = useCallback(() => {
    const fieldSteps: Record<FormSteps, Array<FieldPath<ListingFormData>>> = {
      basic: ["type", "title", "description", "tags", "expiryDate"],
      upload: ["coverImage"],
      property: [
        "propertyId",
        "contactPersonId",
        "price",
        "additionalCharges",
        "additionalCharges",
      ],
      rent: [
        "rentalDetails",
        "rentalDetails.availableFrom",
        "rentalDetails.furnished",
        "rentalDetails.minimumStay",
        "rentalDetails.rentPeriod",
        "rentalDetails.securityDeposit",
        "rentalDetails.utilities",
      ],
      sale: [
        "saleDetails",
        "saleDetails.downPayment",
        "saleDetails.financingOptions",
        "saleDetails.ownershipTypeId",
        "saleDetails.priceNegotiable",
        "saleDetails.titleDeedReady",
      ],
      auction: [],
      lease: [],
      submit: [],
    };

    for (const step of availableSteps) {
      const fields = fieldSteps[step];
      const hasError = fields.some(
        (field) => form.getFieldState(field as any).invalid
      );

      if (hasError) {
        setActiveTab(step);
        break;
      }
    }
  }, [availableSteps, form]);

  // Auto-correct invalid active tab
  React.useEffect(() => {
    if (activeTab && !availableSteps.includes(activeTab)) {
      const fallbackStep =
        availableSteps[
          Math.min(
            availableSteps.length - 2,
            availableSteps.indexOf("property")
          )
        ] || "basic";
      setActiveTab(fallbackStep);
    }
  }, [availableSteps, activeTab]);

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

  // Step component mapping - easy to add new steps
  const stepComponents = {
    basic: (
      <ListingBasicDetailsFormSection
        onCancel={onCloseWorkspace}
        onNext={navigateToNext}
      />
    ),
    upload: (
      <ListingMediaUploadsFormStep
        onNext={navigateToNext}
        onPrev={navigateToPrev}
        coverImages={files}
        onCoverImagesChange={setFiles}
        galaryImages={galaryImages}
        onGalaryImagesChange={setGalarayImages}
      />
    ),
    property: (
      <ListingPropertyFormStep
        onNext={navigateToNext}
        onPrev={navigateToPrev}
        isLoadingProperties={isLoadingProperties}
        onPropertySearchChange={searchProperty}
        propertiesSearchresults={properties}
        propertySearchValue={search}
        isLoadingUsers={isLoadingUsers}
        onUserSearchChange={searchUser}
        userSearchValue={userSearchValue}
        userSearchresults={users}
      />
    ),
    rent: (
      <RentalListingFormStep onNext={navigateToNext} onPrev={navigateToPrev} />
    ),
    sale: (
      <SalesListingFormStep onNext={navigateToNext} onPrev={navigateToPrev} />
    ),
    auction: (
      <AuctionListingFormStep onNext={navigateToNext} onPrev={navigateToPrev} />
    ),
    lease: (
      <LeaseListingFormStep onNext={navigateToNext} onPrev={navigateToPrev} />
    ),
    submit: <ListingSubmitStep onPrev={navigateToPrev} />,
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
              if (value && availableSteps.includes(value as FormSteps)) {
                setActiveTab(value as FormSteps);
              }
            }}
          >
            <Tabs.List justify={isMobile ? "space-between" : undefined}>
              {STEP_CONFIG.map(
                (step) =>
                  availableSteps.includes(step.key) && (
                    <Tabs.Tab key={step.key} p={"lg"} value={step.key}>
                      {step.label}
                    </Tabs.Tab>
                  )
              )}
            </Tabs.List>

            {availableSteps.map((stepKey) => (
              <Tabs.Panel key={stepKey} value={stepKey} p={"sm"}>
                {stepComponents[stepKey]}
              </Tabs.Panel>
            ))}

            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Tabs>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default ListingForm;
