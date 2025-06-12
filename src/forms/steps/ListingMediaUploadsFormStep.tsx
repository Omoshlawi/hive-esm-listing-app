import {
  Button,
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Image,
  InputLabel,
} from "@mantine/core";
import React, { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  onCoverImagesChange?: (images: FileWithPath[]) => void;
  coverImages?: FileWithPath[];
  galaryImages?: FileWithPath[];
  onGalaryImagesChange?: (images: FileWithPath[]) => void;
};

const ListingMediaUploadsFormStep: FC<Props> = ({
  onNext,
  onPrev,
  onCoverImagesChange,
  coverImages = [],
  galaryImages = [],
  onGalaryImagesChange,
}) => {
  const form = useFormContext<ListingFormData>();
  const coverImagepreview = coverImages.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  const galaryImagepreview = galaryImages.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Upload necessary files
        </Title>
        <Stack>
          <InputLabel>Cover image</InputLabel>
          <Dropzone
            multiple={false}
            accept={IMAGE_MIME_TYPE}
            onDrop={onCoverImagesChange}
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            <Text ta="center">Drop cover image here</Text>
          </Dropzone>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>{coverImagepreview}</SimpleGrid>
        </Stack>
        <Stack>
          <InputLabel>Galary images</InputLabel>
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={onGalaryImagesChange}
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            <Text ta="center">Drop galary images here</Text>
          </Dropzone>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>
            {galaryImagepreview}
          </SimpleGrid>
        </Stack>
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

export default ListingMediaUploadsFormStep;
