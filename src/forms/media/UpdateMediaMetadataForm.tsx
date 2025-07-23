import { handleApiErrors } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Group,
  Stack,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useListingApi } from "../../hooks";
import { ListingMedia, ListingMediaFormData } from "../../types";
import { ListingMediaSchema } from "../../utils/validation";

type Props = {
  listingId: string;
  media: ListingMedia;
  onClose?: () => void;
  onSuccess?: (media: ListingMedia) => void;
};
const UpdateMediaMetadataForm: FC<Props> = ({
  listingId,
  media,
  onClose,
  onSuccess,
}) => {
  const form = useForm<ListingMediaFormData>({
    defaultValues: media,
    resolver: zodResolver(ListingMediaSchema),
  });
  const { updateListingMedia, mutateListings } = useListingApi();
  const onSubmit: SubmitHandler<ListingMediaFormData> = async (data) => {
    try {
      const res = await updateListingMedia(listingId, media.id, data);
      onSuccess?.(res);
      onClose?.();
      showNotification({
        title: "succes",
        message: `media updated succesfull`,
        color: "teal",
      });
      mutateListings();
    } catch (error) {
      const e = handleApiErrors<ListingMediaFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof ListingMediaFormData, {
            message: val,
          })
        );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack p={"md"} h={"100%"} justify="space-between">
        <Stack gap={"md"}>
          <Controller
            control={form.control}
            name={`title`}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Title"
                error={fieldState.error?.message}
                placeholder="e.g Bedroom"
              />
            )}
          />
          <Controller
            control={form.control}
            name={`tags`}
            render={({ field, fieldState }) => (
              <TagsInput
                {...field}
                label="Tags"
                error={fieldState.error?.message}
                placeholder="Enter tags"
              />
            )}
          />

          <Controller
            control={form.control}
            name={`description`}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                placeholder="Brief description"
                label="Description"
                error={fieldState.error?.message}
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button flex={1} variant="default" radius={0} onClick={onClose}>
            Cancel
          </Button>
          <Button
            radius={0}
            flex={1}
            fullWidth
            type="submit"
            variant="filled"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UpdateMediaMetadataForm;
