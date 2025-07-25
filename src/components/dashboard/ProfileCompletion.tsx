import React, { FC, useMemo } from "react";
import { Property, ListingMedia, Listing } from "../../types";
import {
  Card,
  Stack,
  Group,
  RingProgress,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useListingMedia } from "../../hooks";
type Props = {
  listing: Listing;
};
const ProfileCompletion: FC<Props> = ({ listing }) => {
  const { media: listingMedia } = useListingMedia(listing.id, "IMAGE");
  const completionPercentage = useMemo(() => {
    return calculateCompletionPercentage({
      ...listing,
      media: listingMedia ?? [],
    });
  }, [listingMedia, listing]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Profile Completion
          </Text>
          <Text
            size="sm"
            fw={600}
            c={completionPercentage >= 80 ? "green" : "orange"}
          >
            {completionPercentage}%
          </Text>
        </Group>

        <RingProgress
          size={120}
          thickness={12}
          sections={[
            {
              value: completionPercentage,
              color: completionPercentage >= 80 ? "green" : "orange",
            },
          ]}
          label={
            <Text
              size="xs"
              ta="center"
              px="xs"
              style={{ pointerEvents: "none" }}
            >
              {completionPercentage >= 80 ? "Complete" : "Needs Work"}
            </Text>
          }
          style={{ alignSelf: "center" }}
        />

        <Stack gap="xs">
          <CompletionItem completed={true} label="Basic Details" />

          <CompletionItem completed={!!listing.coverImage} label="Main Photo" />
          <CompletionItem
            completed={listingMedia && listingMedia.length > 0}
            label="Media"
          />
          <CompletionItem
            completed={listing.status === "APPROVED"}
            label="Approved"
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCompletion;
// Helper Components
function CompletionItem({
  completed,
  label,
}: {
  completed: boolean;
  label: string;
}) {
  return (
    <Group gap="xs">
      <ThemeIcon size="sm" variant="light" color={completed ? "green" : "gray"}>
        <IconCheck size={12} />
      </ThemeIcon>
      <Text size="sm" c={completed ? "green" : "dimmed"}>
        {label}
      </Text>
    </Group>
  );
}

function calculateCompletionPercentage(
  listing: Listing & { media: Array<ListingMedia> }
): number {
  const checks = [
    true,
    !!listing.coverImage,
    !!listing.type,
    listing.media && listing.media.length > 0,
    listing.status === "APPROVED",
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}
