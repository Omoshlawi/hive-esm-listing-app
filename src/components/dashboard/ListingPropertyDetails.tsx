import React, { FC } from "react";
import { Listing } from "../../types";
import {
  Badge,
  Card,
  Chip,
  Divider,
  Group,
  NumberFormatter,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { getListingTypeColor, getStatusColor } from "../../utils/helpers";
import dayjs from "dayjs";
import { TablerIcon, When } from "@hive/esm-core-components";
import { useProperty, useSearchProperties } from "../../hooks";

type Props = {
  listing: Listing;
};

const ListingPropertyDetails: FC<Props> = ({ listing }) => {
  const propertiesAsync = useProperty(listing.propertyId);
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Card withBorder>
        <Stack>
          <Title order={4}>Listing Details</Title>
          <Table variant="vertical" layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>Title</Table.Th>
                <Table.Td>{listing.title}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th w={160}>Listing number</Table.Th>
                <Table.Td>{listing.listingNumber}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th w={160}>Listing number</Table.Th>
                <Table.Td>
                  <Group gap={"xs"}>
                    {listing.tags.map((t) => (
                      <Badge size="xs" variant="default">
                        {t}
                      </Badge>
                    ))}
                  </Group>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Status</Table.Th>
                <Table.Td>
                  <Badge
                    color={getStatusColor(listing.status)}
                    variant="light"
                    size="xs"
                  >
                    {listing.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Price</Table.Th>
                <Table.Td>
                  <NumberFormatter
                    prefix="Ksh."
                    value={listing.price}
                    thousandSeparator
                  ></NumberFormatter>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Td>
                  <Badge
                    color={getListingTypeColor(listing.type)}
                    variant="light"
                    size="xs"
                  >
                    {listing.type}
                  </Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Featured</Table.Th>
                <Table.Td>
                  <TablerIcon
                    name={listing.featured ? "circleCheck" : "circleX"}
                    color={listing.featured ? "green" : "red"}
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Expiration date</Table.Th>
                <Table.Td>
                  {listing.expiryDate
                    ? dayjs(listing.expiryDate).format("DD/MM/YYYY")
                    : "--"}
                </Table.Td>
              </Table.Tr>
              {listing.listedDate && (
                <Table.Tr>
                  <Table.Th>Date Listed</Table.Th>
                  <Table.Td>
                    {dayjs(listing.listedDate).format("DD/MM/YYYY")}
                  </Table.Td>
                </Table.Tr>
              )}
              <Table.Tr>
                <Table.Th>Last updated at</Table.Th>
                <Table.Td>
                  {dayjs(listing.updatedAt).format("DD/MM/YYYY HH:mm")}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Title order={4}>Property Details</Title>
          <When
            asyncState={{ ...propertiesAsync, data: propertiesAsync.property }}
            loading={() => <LoadingState />}
            success={(property) => (
              <>
                <Table variant="vertical" layout="fixed">
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Th w={160}>Name</Table.Th>
                      <Table.Td>{property.name}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Th>Status</Table.Th>
                      <Table.Td>{property.status}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Th>Address</Table.Th>
                      <Table.Td>{`${property.address.landmark} ${property.address.ward} ${property.address.subCounty} ${property.address.county}`}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Th>Amenities</Table.Th>
                      <Table.Td>
                        <Group gap={"xs"}>
                          {property.amenities.map((a) => (
                            <Badge size="xs" variant="default">
                              {a.amenity?.name}
                            </Badge>
                          ))}
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th>Categories</Table.Th>
                      <Table.Td>
                        <Group gap={"xs"}>
                          {property.categories.map((a) => (
                            <Badge size="xs" variant="default">
                              {a.category?.name}
                            </Badge>
                          ))}
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th>Last updated at</Table.Th>
                      <Table.Td>
                        {dayjs(listing.updatedAt).format("DD/MM/YYYY HH:mm")}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                {property.attributes.length > 0 && (
                  <>
                    <Divider />
                    <Group gap="lg">
                      {property.attributes.map((attr) => (
                        <Group gap="xs" key={attr.id}>
                          <Text fw={500}>{attr.attribute.name}:</Text>
                          <Badge variant="light">{attr.value}</Badge>
                        </Group>
                      ))}
                    </Group>
                  </>
                )}
              </>
            )}
          />
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

export default ListingPropertyDetails;

const LoadingState = () => {
  return (
    <Table variant="vertical" layout="fixed">
      <Table.Tbody>
        {Array.from({ length: 6 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Th w={160}>
              <Skeleton height={20} radius="xl" />
            </Table.Th>
            <Table.Td>
              <Skeleton height={18} radius="xl" />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
