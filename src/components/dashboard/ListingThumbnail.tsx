import { getHiveFileUrl } from "@hive/esm-core-api";
import { TablerIcon } from "@hive/esm-core-components";
import { Button, Card, Center, Image, Stack, Text } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React, { FC } from "react";
import ThumbnailUploadForm from "../../forms/ThumbnailUploadForm";
import { Listing } from "../../types";

type Props = {
  listing: Listing;
};

const ListingThumbnail: FC<Props> = ({ listing }) => {
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
  if (listing.coverImage)
    return (
      <Image
        src={getHiveFileUrl(listing.coverImage)}
        alt={listing.title}
        width={120}
        height={420}
        radius="md"
        fallbackSrc="https://placehold.co/600x500?text=Placeholder"
      />
    );
  return (
    <Card withBorder radius={"md"}>
      <Center>
        <Stack align="center" justify="center">
          <TablerIcon name="photoCancel" size={80} opacity={0.5} />
          <Text c={"dimmed"}>Thumbnail image not Uploaded</Text>
          <Button
            radius={"xl"}
            leftSection={<TablerIcon name="upload" size={16} />}
            variant="gradient"
            gradient={{ from: "red", to: "green" }}
            onClick={handleUploadThumbnail}
          >
            Upload Thumbnail
          </Button>
        </Stack>
      </Center>
    </Card>
  );
};

export default ListingThumbnail;
