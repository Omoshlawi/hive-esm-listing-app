import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

type ListingDetailPageProps = Pick<PiletApi, "launchWorkspace">;

const ListingDetailPage: FC<ListingDetailPageProps> = ({ launchWorkspace }) => {
  const { listingId, propertyId } = useParams<{
    propertyId: string;
    listingId: string;
  }>();
  return <div>ListingDetailPage: {listingId}</div>;
};

export default ListingDetailPage;
