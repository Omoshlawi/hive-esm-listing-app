import { PiletApi } from "@hive/esm-shell-app";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { Listing } from "../types";

type ListingsPageProps = Pick<PiletApi, "launchWorkspace">;
const ListingsPage: FC<ListingsPageProps> = ({ launchWorkspace }) => {
  return <div>ListingsPage</div>;
};

export default ListingsPage;
const columns: ColumnDef<Listing>[] = [];
