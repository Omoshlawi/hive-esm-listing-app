import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { Listings } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dashboard/listings",
    () => <Listings launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
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
}
