import React, { FC } from "react";
import { Listing } from "../../types";
import { SimpleGrid, Paper, Stack, Title, Table, Badge } from "@mantine/core";
import { getStatusColor } from "../../utils/helpers";
type Props = {
  listing: Listing;
};
const DetailsTab: FC<Props> = ({ listing }) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md" style={{ overflow: "auto" }}>
          <Title order={4}>Property Specifications</Title>
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Property Type</Table.Td>
                <Table.Td fw={500}>{"listing.property.propertyType"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Bedrooms</Table.Td>
                <Table.Td fw={500}>{"listing.property.bedrooms"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Bathrooms</Table.Td>
                <Table.Td fw={500}>{"listing.property.bathrooms"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Square Footage</Table.Td>
                <Table.Td fw={500}>
                  {"listing.property.squareFootage.toLocaleString()"} sq ft
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Year Built</Table.Td>
                <Table.Td fw={500}>{"listing.property.yearBuilt"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Parking Spaces</Table.Td>
                <Table.Td fw={500}>
                  {"mockListing.property.parkingSpaces"}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Floor</Table.Td>
                <Table.Td fw={500}>
                  {"listing.property.floorNumber"} of{" "}
                  {"listing.property.totalFloors"}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Furnished</Table.Td>
                <Table.Td fw={500}>{"listing.property.furnished"}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Pet Policy</Table.Td>
                <Table.Td fw={500}>{"mockListing.property.petPolicy"}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>

      <Paper p="lg" radius="md" shadow="sm">
        <Stack gap="md"         style={{ overflow: "auto" }}
>
          <Title order={4}>Listing Information</Title>
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Listing Type</Table.Td>
                <Table.Td>
                  <Badge variant="outline">For {listing.type}</Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Status</Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(listing.status)}>
                    {listing.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Listed Date</Table.Td>
                <Table.Td fw={500}>
                  {new Date(listing.listedDate).toLocaleDateString()}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Expires</Table.Td>
                <Table.Td fw={500}>
                  {new Date(listing.expiryDate).toLocaleDateString()}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Total Views</Table.Td>
                <Table.Td fw={500}>{listing.views.toLocaleString()}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Property ID</Table.Td>
                <Table.Td
                  fw={500}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                  }}
                >
                  {listing.id.slice(0, 8)}...
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};

export default DetailsTab;
