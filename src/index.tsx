import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { ListingDetail, Listings, PropertyListings } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";
import ListingChartLayout from "./layout/ListingChart";
import { useListingChartListing, usePropertyChartProperty } from "./hooks";
import { ListingChartBanner } from "./components/Banner";
import ListingQuickActions from "./components/ListingQuickActions";

export function setup(app: PiletApi) {
  app.registerPageLayout("listingChart", ({ children }) => (
    <ListingChartLayout Extension={app.Extension}>
      {children}
    </ListingChartLayout>
  ));
  app.registerPage(
    "/dashboard/listings",
    () => <Listings launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dashboard/listings/:listingId",
    () => <ListingDetail launchWorkspace={app.launchWorkspace} />,
    { layout: "listingChart" }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/listings",
    () => <PropertyListings launchWorkspace={app.launchWorkspace} />,
    { layout: "propertyChart" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Listings"
        to="/dashboard/listings"
        icon="listDetails"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => {
      const id = usePropertyChartProperty();
      return (
        <HeaderLink
          label="Listings"
          to={`/dashboard/properties/${id}/listings`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "propertyChart" as any }
  );
  app.registerMenu(
    ({ onClose }: any) => {
      const id = useListingChartListing();
      return (
        <HeaderLink
          label="summary"
          to={`/dashboard/listings/${id}`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "listingChart" as any }
  );

  app.registerExtension("listing-chart-banner-extension-slot", ({ params }) => (
    <ListingChartBanner {...params} />
  ));
  app.registerExtension(
    "listing-chart-banner-actions-extension-slot",
    ({ params }) => (
      <ListingQuickActions {...params} launchWorkspace={app.launchWorkspace} />
    )
  );
}
