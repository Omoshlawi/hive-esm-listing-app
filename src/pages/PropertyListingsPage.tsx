import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router";

type PropertyListingsPageProps = Pick<PiletApi, "launchWorkspace">;

const PropertyListingsPage: FC<PropertyListingsPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{
    propertyId: string;
  }>();
  return <div>PropertyListingsPage: {propertyId}</div>;
};

export default PropertyListingsPage;
