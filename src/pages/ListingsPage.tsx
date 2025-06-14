import { PiletApi } from "@hive/esm-shell-app";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Listing } from "../types";
import { useListings } from "../hooks";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { ListingForm } from "../forms";
import { openConfirmModal } from "@mantine/modals";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { getStatusColor, getStatusVariant } from "../utils/helpers";

type ListingsPageProps = Pick<PiletApi, "launchWorkspace">;
const ListingsPage: FC<ListingsPageProps> = ({ launchWorkspace }) => {
  const asyncListing = useListings();
  const handleAddOrupdate = (listing?: Listing) => {
    const dispose = launchWorkspace(
      <ListingForm
        listing={listing}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: listing ? "Update Listing" : "Add Listing",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (listing: Listing) => {
    openConfirmModal({
      title: "Delete listing",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete Listing", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  return (
    <StateFullDataTable
      title="Listings"
      onAdd={() => handleAddOrupdate()}
      columns={[
        ...columns,
        {
          id: "actions",
          header: "Actions",
          cell({ row }) {
            const listing = row.original;
            return (
              <Group>
                <Group>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    color="green"
                    onClick={() => handleAddOrupdate(listing)}
                  >
                    <TablerIcon
                      name="edit"
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    color="red"
                    onClick={() => handleDelete(listing)}
                  >
                    <TablerIcon
                      name="trash"
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Group>
            );
          },
        },
      ]}
      {...asyncListing}
      data={asyncListing.listings}
      withColumnViewOptions
    />
  );
};

export default ListingsPage;
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
