import {
  DataTableColumnHeader,
  StateFullDataTable,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { Badge, Button, useComputedColorScheme } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useListings } from "../hooks";
import { Listing } from "../types";
import { getStatusColor, getStatusVariant } from "../utils/helpers";

type PropertyListingsPageProps = Pick<PiletApi, "launchWorkspace">;

const PropertyListingsPage: FC<PropertyListingsPageProps> = ({
  launchWorkspace,
}) => {
  const { propertyId } = useParams<{
    propertyId: string;
  }>();

  const asyncListing = useListings({ propertyId });

  return (
    <StateFullDataTable
      title="Listings"
      columns={columns}
      {...asyncListing}
      data={asyncListing.listings}
      withColumnViewOptions
    />
  );
};

export default PropertyListingsPage;
const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell({ row }) {
      const listing = row.original;
      const link = `/dashboard/listings/${listing.id}`;
      return (
        <Button variant="transparent" component={Link} to={link}>
          {listing.title}
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell({ getValue }) {
      const type = getValue<Listing["type"]>();
      return <Badge variant="default">{type}</Badge>;
    },
  },
  {
    accessorKey: "listedDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date listed" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
  {
    accessorKey: "price",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Price" />;
    },
  },
  {
    accessorKey: "expiryDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Expiry Date" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
  {
    accessorKey: "status",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell({ getValue }) {
      const status = getValue<Listing["status"]>();
      const colorScheme = useComputedColorScheme();
      return (
        <Badge
          color={getStatusColor(status)}
          variant={getStatusVariant(status, colorScheme)}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
