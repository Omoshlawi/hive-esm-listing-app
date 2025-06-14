import { ContextualBanner } from "@hive/esm-core-components";
import { Badge, useComputedColorScheme } from "@mantine/core";
import React from "react";
import { useListing } from "../../hooks";
import { Listing } from "../../types";
import { getStatusColor, getStatusVariant } from "../../utils/helpers";
import BannerExpandedSection from "./BannerExpandedSection";

interface PropertyBannerProps {
  listingId: string;
  Extension: React.ComponentType<{ name: string; params: Record<string, any> }>;
  color?: string;
}

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

export function ListingChartBanner({
  listingId,
  Extension,
  color = "green",
}: PropertyBannerProps) {
  const listingAsync = useListing(listingId);
  const colorScheme = useComputedColorScheme();

  return (
    <ContextualBanner<Listing>
      {...listingAsync}
      data={listingAsync.listing}
      renderTitle={(listing) => listing.title}
      icon="listDetails"
      color={color}
      iconVisbleFrom="sm"
      renderId={(l) => l.id}
      renderTimeStamp={(l) => `Created ${formatDate(l.createdAt)}`}
      renderBadges={(l) => (
        <Badge
          size="sm"
          color={getStatusColor(l.status)}
          variant={getStatusVariant(l.status, colorScheme)}
          style={{
            textTransform: "capitalize",
            fontWeight: 500,
          }}
        >
          {l.status.replace("_", " ")}
        </Badge>
      )}
      renderExpandedSection={(l) => <BannerExpandedSection listing={l} />}
      renderMenuExtensionSlot={(l) => (
        <Extension
          name="listing-chart-banner-actions-extension-slot"
          params={{}}
        />
      )}
    />
  );
}
