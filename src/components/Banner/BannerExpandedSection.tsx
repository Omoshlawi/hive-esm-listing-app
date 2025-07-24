import { TablerIcon, TablerIconName } from "@hive/esm-core-components";
import {
  Group,
  SimpleGrid,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import React, { FC } from "react";
import { Listing } from "../../types";

type BannerExpandedSectionProps = {
  listing: Listing;
};

// Format date helper with relative time
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BannerExpandedSection: FC<BannerExpandedSectionProps> = ({ listing }) => {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  const getTextColor = (type: "primary" | "dimmed") => {
    if (colorScheme === "dark") {
      return type === "primary" ? theme.colors.gray[0] : theme.colors.gray[5];
    }
    return type === "primary" ? theme.colors.gray[9] : theme.colors.gray[6];
  };
  const attrs: Array<{ icon: TablerIconName; label: string; value: string }> = [
    { icon: "building", value: listing.property.name, label: "Property" },
    {
      icon: "calendar",
      value: `${listing.property.address?.subCounty} ${listing.property?.address?.county}`,
      label: "Address",
    },
    { icon: "building", value: listing.tags.join(", "), label: "Tags" },
    {
      icon: "calendar",
      value: formatDate(listing.updatedAt || listing.createdAt),
      label: "Last updated",
    },
  ];
  return (
    <Stack gap="md">
      <Text size="sm" fw={600} c={getTextColor("primary")} mb="xs">
        Listing Details
      </Text>

      <SimpleGrid spacing={"sm"} cols={{ base: 1, md: 2, lg: 4 }}>
        {attrs.map((attr, index) => (
          <Stack gap="sm" key={index}>
            <Group gap="xs">
              <TablerIcon
                name={attr.icon}
                size={16}
                style={{ color: getTextColor("dimmed") }}
              />
              <Text size="sm" fw={500} c={getTextColor("primary")}>
                {attr.label}
              </Text>
            </Group>
            <Text size="sm" c={getTextColor("dimmed")}>
              {attr.value}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>

      {listing.description && (
        <Stack gap="xs">
          <Text size="sm" fw={500} c={getTextColor("primary")}>
            Description
          </Text>
          <Text
            size="sm"
            c={getTextColor("dimmed")}
            style={{
              lineHeight: 1.5,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            {listing.description}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default BannerExpandedSection;
