import { cleanFiles, handleApiErrors, uploadFiles } from "@hive/esm-core-api";
import { Button, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import React, { FC, useState } from "react";
import { useListingApi } from "../hooks";
import { Listing } from "../types";

type ThumbnailUploadFormProps = {
  listing: Listing;
  onClose?: () => void;
  onSuccess?: (listing: Listing) => void;
};

const ThumbnailUploadForm: FC<ThumbnailUploadFormProps> = ({
  listing,
  onClose,
  onSuccess,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const { updateListing, mutateListings } = useListingApi();
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleUpload = async () => {
    try {
      setLoading(true);
      const uploaded = await uploadFiles({
        files: { image: files },
        path: "thumbnail",
      });
      const _file = uploaded["image"][0];

      const _listing = await updateListing(listing.id, {
        coverImage: _file.path,
      });
      if (listing.coverImage) await cleanFiles([listing.coverImage]);
      showNotification({
        title: `Upload complete`,
        message: `Cover photo Uploaded succesfully`,
        color: "green",
        position: "top-right",
      });
      onSuccess?.(_listing);
      mutateListings();
      onClose?.();
    } catch (error) {
      const e = handleApiErrors(error);
      if (e.detail) {
        showNotification({
          title: `Error Uploading image`,
          message: e.detail,
          color: "red",
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={setFiles}
        loading={loading}
        disabled={loading}
        multiple={false}
      >
        <Text ta="center">Drop image here</Text>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
      <Group justify="flex-end">
        <Button
          onClick={() => setFiles([])}
          disabled={files.length === 0 || loading}
          variant="default"
        >
          Clear
        </Button>
        <Button
          onClick={handleUpload}
          disabled={files.length === 0 || loading}
          loading={loading}
        >
          Upload
        </Button>
      </Group>
    </Stack>
  );
};

export default ThumbnailUploadForm;
