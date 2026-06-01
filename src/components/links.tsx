import { HeaderLink, withUserAccess } from "@havena/esm-core-components";
import React from "react";

export const OrganizationContextHeaderLink = withUserAccess(HeaderLink, {
  isAuthenticated: (session) =>
    session.isAuthenticated && Boolean(session.currentOrganization),
  requiresAuth: true,
  fallbackComponent: <></>,
});
