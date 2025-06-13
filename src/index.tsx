import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { ListingDetail, Listings, PropertyListings } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";
import { useChartCurrentProperty } from "./hooks";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dashboard/listings",
    () => <Listings launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/listings/:listingId",
    () => <ListingDetail launchWorkspace={app.launchWorkspace} />,
    { layout: "propertyChart" }
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
      const id = useChartCurrentProperty();
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
}
