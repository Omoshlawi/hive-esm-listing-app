import {
  Button,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Title,
  Text,
  Avatar,
  Card,
} from "@mantine/core";
import React, { FC, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSearchProperties } from "../../hooks";
import { useContactPerson, useSearchUser } from "../../hooks/useUsers";
import { Listing, ListingFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
import ListingAdditionalCharges from "../ListingAdditionalCharges";
import { getHiveFileUrl } from "@hive/esm-core-api";
type Props = {
  onPrev?: () => void;
  listing?: Listing;
};

const ListingPropertyFormStep: FC<Props> = ({ onPrev, listing }) => {
  const {
    properties,
    isLoading: isLoadingProperties,
    searchProperty,
    search,
  } = useSearchProperties();
  const {
    users,
    isLoading: isLoadingUsers,
    searchUser,
    searchValue: userSearchValue,
  } = useSearchUser();
  const form = useFormContext<ListingFormData>();
  const { contactPerson } = useContactPerson(listing.contactPersonId);
  useEffect(() => {
    if (contactPerson) {
      searchUser(contactPerson?.person?.email);
    }
  }, [contactPerson]);
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Listing Property
        </Title>
        {listing ? (
          <Card withBorder>
            <Group>
              <Avatar src={getHiveFileUrl(listing.property.thumbnail)} />
              <Stack gap={0}>
                <Text fw={600} c={"dimmed"}>
                  Property
                </Text>
                <Text>{listing?.property?.name}</Text>
              </Stack>
            </Group>
          </Card>
        ) : (
          <Controller
            control={form.control}
            name="propertyId"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                data={properties.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
                placeholder="Search property to list"
                limit={10}
                rightSection={isLoadingProperties && <Loader size={"xs"} />}
                label="Property"
                searchable
                searchValue={search}
                onSearchChange={searchProperty}
                error={error?.message}
                nothingFoundMessage="Nothing found..."
                clearable
              />
            )}
          />
        )}
        <Controller
          control={form.control}
          name="contactPersonId"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              data={users.map((u) => ({
                label: u?.person?.email,
                value: u.id,
              }))}
              rightSection={isLoadingUsers && <Loader size={"xs"} />}
              searchValue={userSearchValue}
              onSearchChange={searchUser}
              placeholder="Search user"
              limit={10}
              label="Responsible person"
              searchable
              error={error?.message}
              nothingFoundMessage="Nothing found..."
              clearable
            />
          )}
        />
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Price"
              inputWrapperOrder={INPUT_ORDER}
              description="In Ksh."
              error={fieldState.error?.message}
              placeholder="Enter price"
            />
          )}
        />
        {!!!listing && <ListingAdditionalCharges />}
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onPrev}>
          Previous
        </Button>
        <Button
          radius={0}
          flex={1}
          fullWidth
          type={"submit"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
};

export default ListingPropertyFormStep;
