import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
import { useFinancingOptions } from "../../hooks";
import { InputSkeleton, TablerIcon, When } from "@hive/esm-core-components";
import {
  Alert,
  Button,
  Checkbox,
  Fieldset,
  Group,
  Select,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import { handleApiErrors } from "@hive/esm-core-api";

const SaleListingFinancialOptionsInput = () => {
  const form = useFormContext<ListingFormData>();
  const { data, error, isLoading } = useFinancingOptions();
  const financialOptions = form.watch("saleDetails.financingOptions") ?? [];

  if (isLoading)
    return (
      <Stack>
        {Array.from({ length: 3 }).map((_, index) => (
          <Group key={index}>
            <InputSkeleton />
            <InputSkeleton />
          </Group>
        ))}
      </Stack>
    );

  if (error)
    return (
      <Alert color="red" title="Error loading financing options">
        {handleApiErrors(error).detail}
      </Alert>
    );
  return (
    <Stack gap={"md"}>
      <Title order={6} pt={"lg"}>
        Financing options
      </Title>
      {financialOptions.map((_, index) => (
        <Fieldset legend="Financial option" py={"xs"} key={index}>
          <Stack flex={1} gap={"xs"}>
            <Controller
              control={form.control}
              name={`saleDetails.financingOptions.${index}.optionId`}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  data={data.map((d) => ({
                    label: d.name,
                    value: d.id,
                    disabled:
                      financialOptions.findIndex(
                        (option) => option.optionId === d.id
                      ) !== -1,
                  }))}
                  placeholder="Select Option"
                  label="Financing option"
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`saleDetails.financingOptions.${index}.notes`}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  {...field}
                  placeholder="Notes"
                  label="Notes..."
                  error={error?.message}
                />
              )}
            />
            <Button
              color="red"
              variant="light"
              onClick={() => {
                const fields = financialOptions.filter((_, i) => i !== index);
                form.setValue(`saleDetails.financingOptions`, fields as any);
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
          form.setValue(
            `saleDetails.financingOptions.${financialOptions.length}`,
            {}
          );
        }}
      >
        Add Financing Option
      </Button>
    </Stack>
  );
};

export default SaleListingFinancialOptionsInput;
