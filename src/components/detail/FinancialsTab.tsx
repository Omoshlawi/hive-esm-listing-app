import React, { FC } from "react";
import { Listing } from "../../types";
import {
  Grid,
  Stack,
  Paper,
  Title,
  Group,
  NumberFormatter,
  Divider,
  Alert,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconInfoCircle, IconCalculator } from "@tabler/icons-react";

type Props = {
  listing: Listing;
};

const additionalCharges = [
  { name: "HOA Fee", amount: 450, frequency: "MONTHLY", mandatory: true },
  {
    name: "Property Tax",
    amount: 15000,
    frequency: "ANNUALLY",
    mandatory: true,
  },
  {
    name: "Parking Fee",
    amount: 150,
    frequency: "MONTHLY",
    mandatory: false,
  },
  {
    name: "Storage Unit",
    amount: 75,
    frequency: "MONTHLY",
    mandatory: false,
  },
];

const FinancialsTab: FC<Props> = ({ listing }) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];
  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap="md">
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Purchase Price</Title>
              <Group justify="space-between">
                <Text>Listed Price</Text>
                <Text fw={500} size="lg">
                  <NumberFormatter
                    value={listing.price}
                    prefix="Ksh."
                    thousandSeparator
                  />
                </Text>
              </Group>
              {listing.saleDetails?.downPayment && (
                <>
                  <Group justify="space-between">
                    <Text>Down Payment (20%)</Text>
                    <Text fw={500}>
                      <NumberFormatter
                        value={listing.saleDetails.downPayment}
                        prefix="$"
                        thousandSeparator
                      />
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text>Loan Amount</Text>
                    <Text fw={500}>
                      <NumberFormatter
                        // value={
                        //   listing.price -
                        //   listing.saleDetails?.downPayment
                        // }
                        value={10000}
                        prefix="$"
                        thousandSeparator
                      />
                    </Text>
                  </Group>
                </>
              )}
              <Divider />
              <Group justify="space-between">
                <Text>Price per sq ft</Text>
                <Text fw={500}>
                  <NumberFormatter
                    // value={
                    //   mockListing.price / mockListing.property.squareFootage
                    // }
                    value={1000}
                    prefix="Ksh. "
                    decimalScale={0}
                  />
                </Text>
              </Group>
            </Stack>
          </Paper>

          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Monthly Costs</Title>
              <Group justify="space-between">
                <Text>Estimated Mortgage</Text>
                <Text fw={500}>
                  <NumberFormatter
                    // value={mockListing.saleDetails?.monthlyMortgage || 0}
                    value={20000}
                    prefix="Ksh. "
                    thousandSeparator
                  />
                </Text>
              </Group>
              <Group justify="space-between">
                <Text>Property Tax (monthly)</Text>
                <Text fw={500}>
                  <NumberFormatter
                    // value={(mockListing.saleDetails?.propertyTax || 0) / 12}
                    value={10000}
                    prefix="Ksh. "
                    decimalScale={0}
                  />
                </Text>
              </Group>
              <Group justify="space-between">
                <Text>HOA Fees</Text>
                <Text fw={500}>
                  <NumberFormatter
                    // value={mockListing.saleDetails?.hoaFees || 0}
                    value={2000}
                    prefix="Ksh."
                    thousandSeparator
                  />
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={500}>Total Monthly</Text>
                <Text fw={700} size="lg" style={{ color: primaryColor[6] }}>
                  <NumberFormatter
                    // value={
                    //   (mockListing.saleDetails?.monthlyMortgage || 0) +
                    //   (mockListing.saleDetails?.propertyTax || 0) / 12 +
                    //   (mockListing.saleDetails?.hoaFees || 0)
                    // }
                    value={5000}
                    prefix="Ksh."
                    decimalScale={0}
                  />
                </Text>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Paper p="lg" radius="md" shadow="sm">
          <Stack gap="md">
            <Title order={4}>Additional Charges</Title>
            {additionalCharges.map((charge, index) => (
              <Group key={index} justify="space-between">
                <div>
                  <Text size="sm" fw={500}>
                    {charge.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {charge.frequency.toLowerCase().replace("_", " ")} •{" "}
                    {charge.mandatory ? "Mandatory" : "Optional"}
                  </Text>
                </div>
                <Text fw={500}>
                  <NumberFormatter
                    value={charge.amount}
                    prefix="Ksh."
                    thousandSeparator
                  />
                </Text>
              </Group>
            ))}

            <Divider mt="md" />

            <Alert
              icon={<IconInfoCircle size={16} />}
              color="blue"
              variant="light"
            >
              <Text size="sm">
                Use our mortgage calculator to get personalized payment
                estimates based on your down payment and interest rate.
              </Text>
            </Alert>

            <Button
              variant="outline"
              leftSection={<IconCalculator size={16} />}
              //   onClick={openCalculatorModal}
              fullWidth
            >
              Mortgage Calculator
            </Button>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default FinancialsTab;
