import { handleApiErrors } from "@hive/esm-core-api";
import { PiletApi } from "@hive/esm-shell-app";
import { Alert, Menu, Skeleton, Stack } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconEdit,
  IconExclamationCircle,
  IconPhoto,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import React, { FC } from "react";
import { ListingForm } from "../forms";
import ThumbnailUploadForm from "../forms/ThumbnailUploadForm";
import { useListing, useListingApi, useListingChartListing } from "../hooks";

type PropertyQuickActionsProps = Pick<PiletApi, "launchWorkspace"> & {};

const ListingQuickActions: FC<PropertyQuickActionsProps> = ({
  launchWorkspace,
}) => {
  const propertyId = useListingChartListing();
  const { submitDraftListingForReview, approvePendingListing, mutateListings } =
    useListingApi();
  const { isLoading, error, listing } = useListing(propertyId);
  const handleEditProperty = () => {
    const dispose = launchWorkspace(
      <ListingForm onCloseWorkspace={() => dispose()} listing={listing} />,
      {
        width: "wide",
        title: "Update Property",
      }
    );
  };

  const handleUploadThumbnail = () => {
    const modalId = openModal({
      title: "Upload Thumbnail",
      children: (
        <ThumbnailUploadForm
          listing={listing}
          onClose={() => closeModal(modalId)}
        />
      ),
    });
  };

  const handleChangeStatus = async (
    action: "approve" | "reject" | "submit"
  ) => {
    const id = showNotification({
      loading: true,
      title: "Validating Submitting",
      message: "Please wait",
      autoClose: false,
      withCloseButton: false,
    });
    try {
      if (action === "submit") await submitDraftListingForReview(propertyId);
      else if (action === "approve") await approvePendingListing(propertyId);
      mutateListings();
      updateNotification({
        id,
        color: "teal",
        title: "Success",
        message: "Validation passed and submited succesfully",
        icon: <IconCheck size={18} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id,
        color: "red",
        title: "Error",
        message: handleApiErrors(error)?.detail,
        icon: <IconExclamationCircle size={18} />,
        loading: false,
        autoClose: 2000,
      });
    }
  };

  if (isLoading)
    return (
      <Stack gap={"xs"}>
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
        <Skeleton h={40} w={"100%"} />
      </Stack>
    );
  if (error)
    return (
      <Alert color="red" title="Error getting property">
        {handleApiErrors(error).detail}
      </Alert>
    );
  return (
    <>
      <Menu.Item
        leftSection={<IconPhoto size={16} />}
        onClick={handleUploadThumbnail}
      >
        Update Thumbnail
      </Menu.Item>
      <Menu.Item
        leftSection={<IconEdit size={16} />}
        onClick={handleEditProperty}
      >
        Edit Listing
      </Menu.Item>
      {listing.status === "DRAFT" && (
        <Menu.Item
          leftSection={<IconUpload size={16} />}
          onClick={() => handleChangeStatus("submit")}
        >
          Submit draft fo review
        </Menu.Item>
      )}
      {listing.status === "PENDING" && (
        <Menu.Item
          leftSection={<IconCheck size={16} />}
          onClick={() => handleChangeStatus("approve")}
          color="green"
        >
          Approve pemding listing
        </Menu.Item>
      )}

      <Menu.Item leftSection={<IconTrash size={16} />} color="red">
        Delete Listing
      </Menu.Item>
    </>
  );
};

export default ListingQuickActions;
