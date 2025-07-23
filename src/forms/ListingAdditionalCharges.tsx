import { TablerIcon } from "@hive/esm-core-components";
import {
  Button,
  Card,
  Checkbox,
  Fieldset,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../types";

const ListingAdditionalCharges = () => {
  const form = useFormContext<ListingFormData>();
  const attrs = form.watch("additionalCharges") ?? [];
  return (
    <Card component={Stack} withBorder>
      {attrs.map((_, index) => (
        <Fieldset legend="Additional Charge" py={"xs"}>
          <Stack flex={1} gap={"xs"}>
            <Controller
              control={form.control}
              name={`additionalCharges.${index}.name`}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  placeholder="Charge name"
                  label="Charge"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`additionalCharges.${index}.frequency`}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  data={[
                    { label: "One Time", value: "ONE_TIME" },
                    { label: "Monthly", value: "MONTHLY" },
                    { label: "Weekly", value: "WEEKLY" },
                    { label: "Per Night", value: "PER_NIGHT" },
                    { label: "Annually", value: "ANNUALLY" },
                  ]}
                  placeholder="Select frequency"
                  label="Frequency"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`additionalCharges.${index}.amount`}
              render={({ field, fieldState: { error } }) => (
                <NumberInput
                  {...field}
                  placeholder="Charge amount"
                  label="Amount"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`additionalCharges.${index}.description`}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  {...field}
                  placeholder="Description"
                  label="Description"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`additionalCharges.${index}.mandatory`}
              render={({ field, fieldState: { error } }) => (
                <Checkbox
                  label="Mandatory?"
                  checked={field.value}
                  onChange={(event) =>
                    field.onChange(event.currentTarget.checked)
                  }
                  error={error?.message}
                  ref={field.ref}
                  disabled={field.disabled}
                  name={field.name}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Button
              color="red"
              variant="light"
              onClick={() => {
                const fields = attrs.filter((_, i) => i !== index);
                form.setValue(`additionalCharges`, fields);
              }}
              leftSection={<TablerIcon name="trash" size={16} />}
            >
              Delete
            </Button>
          </Stack>
        </Fieldset>
      ))}
      <Button
        variant="outline"
        leftSection={<TablerIcon name="plus" />}
        onClick={() => {
          form.setValue(`additionalCharges.${attrs.length}`, {
            amount: 0,
            name: "",
            description: "",
            frequency: "ONE_TIME",
            mandatory: false,
          });
        }}
      >
        Add Additional charges
      </Button>
    </Card>
  );
};

export default ListingAdditionalCharges;
