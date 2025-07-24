import {
  DashboardPageHeader,
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ListingForm } from "../forms";
import { useListings } from "../hooks";
import { Listing } from "../types";
import {
  getListingTypeColor,
  getStatusColor,
  getStatusVariant,
} from "../utils/helpers";

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
    <Stack gap={"xl"}>
      <Box>
        <DashboardPageHeader
          title="Listings"
          subTitle={`
            Organization Listings`}
          icon={"building"}
        />
      </Box>
      <StateFullDataTable
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
                  {/* <ActionIcon
                    variant="outline"
                    aria-label="Edit"
                    color="green"
                    onClick={() => handleAddOrupdate(listing)}
                  >
                    <TablerIcon
                      name="edit"
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon> */}
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
              );
            },
          },
        ]}
        {...asyncListing}
        data={asyncListing.listings}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default ListingsPage;
const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "listingNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listing Number" />
    ),
  },
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
      return (
        <Badge variant="outline" color={getListingTypeColor(type)} size="xs">
          {type}
        </Badge>
      );
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
      if (!created) return "--";
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
