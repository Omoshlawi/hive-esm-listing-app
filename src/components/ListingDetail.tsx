import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Image,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import {
  IconBuildingEstate,
  IconCheck,
  IconClock,
  IconCoin,
  IconDownload,
  IconExternalLink,
  IconFileText,
  IconHome,
  IconPhoto,
  IconShield,
  IconTrendingUp,
  IconVideo
} from "@tabler/icons-react";
import React, { useState } from "react";

// Mock data based on your Prisma model (without nested property)
const mockListing = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Luxury Downtown Penthouse with City Views",
  description:
    "Experience urban luxury in this stunning penthouse featuring floor-to-ceiling windows, premium finishes, and breathtaking city skyline views. This exceptional property offers the perfect blend of modern sophistication and comfortable living.",
  type: "SALE",
  status: "APPROVED",
  price: 1250000,
  coverImage: "/placeholder.svg?height=400&width=600",
  featured: true,
  listedDate: "2024-01-15T00:00:00Z",
  expiryDate: "2024-07-15T00:00:00Z",
  views: 1247,
  tags: ["luxury", "penthouse", "downtown", "city-view", "modern"],

  saleDetails: {
    downPayment: 250000,
    priceNegotiable: true,
    ownershipType: { name: "Freehold", description: "Full ownership rights" },
    titleDeedReady: true,
    financingOptions: [
      { option: { name: "Cash", description: "Full cash payment" } },
      { option: { name: "Mortgage", description: "Bank financing available" } },
      { option: { name: "Installments", description: "Developer financing" } },
    ],
  },

  media: [
    {
      id: "1",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "IMAGE",
      title: "Living Room",
      order: 1,
    },
    {
      id: "2",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "IMAGE",
      title: "Master Bedroom",
      order: 2,
    },
    {
      id: "3",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "IMAGE",
      title: "Kitchen",
      order: 3,
    },
    {
      id: "4",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "IMAGE",
      title: "Bathroom",
      order: 4,
    },
    {
      id: "5",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "VIDEO",
      title: "Property Tour",
      order: 5,
    },
    {
      id: "6",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "FLOOR_PLAN",
      title: "Floor Plan",
      order: 6,
    },
  ],

  additionalCharges: [
    { name: "HOA Fee", amount: 450, frequency: "MONTHLY", mandatory: true },
    {
      name: "Property Tax",
      amount: 12000,
      frequency: "ANNUALLY",
      mandatory: true,
    },
    {
      name: "Parking Fee",
      amount: 150,
      frequency: "MONTHLY",
      mandatory: false,
    },
  ],

  statusHistory: [
    {
      newStatus: "DRAFT",
      createdAt: "2024-01-10T00:00:00Z",
      reason: "Initial creation",
    },
    {
      newStatus: "PENDING",
      createdAt: "2024-01-12T00:00:00Z",
      reason: "Submitted for review",
    },
    {
      newStatus: "APPROVED",
      createdAt: "2024-01-15T00:00:00Z",
      reason: "All requirements met",
    },
  ],

  contactPerson: {
    id: "agent-123",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@realestate.com",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    totalSales: 127,
  },
};

export function ListingDetail() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [favorited, setFavorited] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(mockListing.coverImage);

  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];

  const getStatusColor = (status: string) => {
    const colors = {
      DRAFT: "gray",
      PENDING: "yellow",
      APPROVED: "green",
      REJECTED: "red",
      SOLD: "blue",
      UNDER_CONTRACT: "orange",
      LEASED: "teal",
      RENTED: "cyan",
      WITHDRAWN: "red",
      EXPIRED: "orange",
    };
    return colors[status as keyof typeof colors] || "gray";
  };

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "IMAGE":
        return <IconPhoto size={16} />;
      case "VIDEO":
        return <IconVideo size={16} />;
      case "FLOOR_PLAN":
        return <IconBuildingEstate size={16} />;
      case "DOCUMENT":
        return <IconFileText size={16} />;
      case "LEGAL_DOC":
        return <IconFileText size={16} />;
      case "CONTRACT":
        return <IconFileText size={16} />;
      default:
        return <IconFileText size={16} />;
    }
  };

  const images = mockListing.media.filter((m) => m.mediaType === "IMAGE");
  const videos = mockListing.media.filter((m) => m.mediaType === "VIDEO");
  const documents = mockListing.media.filter((m) =>
    ["DOCUMENT", "FLOOR_PLAN", "LEGAL_DOC", "CONTRACT"].includes(m.mediaType)
  );

  return (
    <Stack gap="xl">
      {/* Header Section */}
      

      {/* Main Image Display */}
      <Paper p="lg" radius="lg" shadow="sm">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={3}>Property Images</Title>
            <Text size="sm" color="dimmed">
              {images.length} photos
            </Text>
          </Group>

          {/* Main Image */}
          <Box style={{ position: "relative" }}>
            <Image
              src={
                selectedImage || mockListing.coverImage || "/placeholder.svg"
              }
              height={500}
              fit="cover"
              radius="md"
              alt="Property main image"
            />
            {mockListing.featured && (
              <Badge
                variant="gradient"
                gradient={{ from: gradientFrom, to: gradientTo }}
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                }}
              >
                Featured Property
              </Badge>
            )}
          </Box>

          {/* Thumbnail Grid */}
          <SimpleGrid cols={6} spacing="xs">
            {images.slice(0, 6).map((image) => (
              <Image
                key={image.id}
                src={image.url || "/placeholder.svg"}
                height={80}
                fit="cover"
                radius="sm"
                style={{
                  cursor: "pointer",
                  opacity: selectedImage === image.url ? 1 : 0.7,
                  border:
                    selectedImage === image.url
                      ? `2px solid ${primaryColor[6]}`
                      : "none",
                }}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="overview" leftSection={<IconHome size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab
            value="details"
            leftSection={<IconBuildingEstate size={16} />}
          >
            Details
          </Tabs.Tab>
          <Tabs.Tab value="financials" leftSection={<IconCoin size={16} />}>
            Financials
          </Tabs.Tab>
          <Tabs.Tab value="media" leftSection={<IconPhoto size={16} />}>
            Media & Documents
          </Tabs.Tab>
          <Tabs.Tab value="history" leftSection={<IconClock size={16} />}>
            History
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="md">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                {/* Description */}
                <Paper p="lg" radius="md" shadow="sm">
                  <Stack gap="md">
                    <Title order={4}>Description</Title>
                    <Text style={{ lineHeight: 1.6 }}>
                      {mockListing.description}
                    </Text>
                  </Stack>
                </Paper>

                {/* Sale Details (if applicable) */}
                {mockListing.saleDetails && (
                  <Paper p="lg" radius="md" shadow="sm">
                    <Stack gap="md">
                      <Title order={4}>Sale Information</Title>
                      <SimpleGrid cols={2} spacing="md">
                        <Group gap="xs">
                          <IconBuildingEstate size={16} />
                          <div>
                            <Text size="sm" fw={500}>
                              Ownership Type
                            </Text>
                            <Text size="sm" color="dimmed">
                              {mockListing.saleDetails.ownershipType.name}
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <IconShield size={16} />
                          <div>
                            <Text size="sm" fw={500}>
                              Title Deed
                            </Text>
                            <Text size="sm" color="dimmed">
                              {mockListing.saleDetails.titleDeedReady
                                ? "Ready"
                                : "Pending"}
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <IconTrendingUp size={16} />
                          <div>
                            <Text size="sm" fw={500}>
                              Price
                            </Text>
                            <Text size="sm" color="dimmed">
                              {mockListing.saleDetails.priceNegotiable
                                ? "Negotiable"
                                : "Fixed"}
                            </Text>
                          </div>
                        </Group>
                        {mockListing.saleDetails.downPayment && (
                          <Group gap="xs">
                            <IconCoin size={16} />
                            <div>
                              <Text size="sm" fw={500}>
                                Down Payment
                              </Text>
                              <Text size="sm" color="dimmed">
                                <NumberFormatter
                                  value={mockListing.saleDetails.downPayment}
                                  prefix="$"
                                  thousandSeparator
                                />
                              </Text>
                            </div>
                          </Group>
                        )}
                      </SimpleGrid>
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                {/* Quick Stats */}
                <Paper p="lg" radius="md" shadow="sm">
                  <Stack gap="md">
                    <Title order={4}>Listing Stats</Title>
                    <Group justify="space-between">
                      <Text size="sm">Days on Market</Text>
                      <Text fw={500}>
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(mockListing.listedDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Total Views</Text>
                      <Text fw={500}>{mockListing.views.toLocaleString()}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Listing Type</Text>
                      <Badge variant="outline">{mockListing.type}</Badge>
                    </Group>
                  </Stack>
                </Paper>

                {/* Financing Options */}
                {mockListing.saleDetails?.financingOptions && (
                  <Paper p="lg" radius="md" shadow="sm">
                    <Stack gap="md">
                      <Title order={4}>Financing Options</Title>
                      {mockListing.saleDetails.financingOptions.map(
                        (option, index) => (
                          <Group key={index} gap="xs">
                            <ThemeIcon
                              size="sm"
                              variant="light"
                              color={theme.primaryColor}
                            >
                              <IconCheck size={12} />
                            </ThemeIcon>
                            <div>
                              <Text size="sm" fw={500}>
                                {option.option.name}
                              </Text>
                              <Text size="xs" color="dimmed">
                                {option.option.description}
                              </Text>
                            </div>
                          </Group>
                        )
                      )}
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="details" pt="md">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Paper p="lg" radius="md" shadow="sm">
              <Stack gap="md">
                <Title order={4}>Listing Information</Title>
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Listing ID</Table.Td>
                      <Table.Td
                        fw={500}
                        style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                      >
                        {mockListing.id}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Type</Table.Td>
                      <Table.Td>
                        <Badge variant="outline">{mockListing.type}</Badge>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Status</Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(mockListing.status)}>
                          {mockListing.status.replace("_", " ")}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Listed Date</Table.Td>
                      <Table.Td fw={500}>
                        {new Date(mockListing.listedDate).toLocaleDateString()}
                      </Table.Td>
                    </Table.Tr>
                    {mockListing.expiryDate && (
                      <Table.Tr>
                        <Table.Td>Expires</Table.Td>
                        <Table.Td fw={500}>
                          {new Date(
                            mockListing.expiryDate
                          ).toLocaleDateString()}
                        </Table.Td>
                      </Table.Tr>
                    )}
                    <Table.Tr>
                      <Table.Td>Views</Table.Td>
                      <Table.Td fw={500}>
                        {mockListing.views.toLocaleString()}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Featured</Table.Td>
                      <Table.Td>
                        {mockListing.featured ? (
                          <Badge color="green" variant="light">
                            Yes
                          </Badge>
                        ) : (
                          <Badge color="gray" variant="light">
                            No
                          </Badge>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Stack>
            </Paper>

            {mockListing.saleDetails && (
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Sale Details</Title>
                  <Table>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td>Ownership Type</Table.Td>
                        <Table.Td fw={500}>
                          {mockListing.saleDetails.ownershipType.name}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Title Deed Status</Table.Td>
                        <Table.Td>
                          <Badge
                            color={
                              mockListing.saleDetails.titleDeedReady
                                ? "green"
                                : "orange"
                            }
                          >
                            {mockListing.saleDetails.titleDeedReady
                              ? "Ready"
                              : "Pending"}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Price Negotiable</Table.Td>
                        <Table.Td>
                          <Badge
                            color={
                              mockListing.saleDetails.priceNegotiable
                                ? "blue"
                                : "gray"
                            }
                          >
                            {mockListing.saleDetails.priceNegotiable
                              ? "Yes"
                              : "No"}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                      {mockListing.saleDetails.downPayment && (
                        <Table.Tr>
                          <Table.Td>Down Payment</Table.Td>
                          <Table.Td fw={500}>
                            <NumberFormatter
                              value={mockListing.saleDetails.downPayment}
                              prefix="$"
                              thousandSeparator
                            />
                          </Table.Td>
                        </Table.Tr>
                      )}
                    </Table.Tbody>
                  </Table>
                </Stack>
              </Paper>
            )}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="financials" pt="md">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Pricing Information</Title>
                  <Group justify="space-between">
                    <Text>Listed Price</Text>
                    <Text fw={500} size="lg">
                      <NumberFormatter
                        value={mockListing.price}
                        prefix="$"
                        thousandSeparator
                      />
                    </Text>
                  </Group>
                  {mockListing.saleDetails?.downPayment && (
                    <>
                      <Group justify="space-between">
                        <Text>Down Payment</Text>
                        <Text fw={500}>
                          <NumberFormatter
                            value={mockListing.saleDetails.downPayment}
                            prefix="$"
                            thousandSeparator
                          />
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text>Remaining Amount</Text>
                        <Text fw={500}>
                          <NumberFormatter
                            value={
                              mockListing.price -
                              mockListing.saleDetails.downPayment
                            }
                            prefix="$"
                            thousandSeparator
                          />
                        </Text>
                      </Group>
                    </>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Additional Charges</Title>
                  {mockListing.additionalCharges.length > 0 ? (
                    mockListing.additionalCharges.map((charge, index) => (
                      <Group key={index} justify="space-between">
                        <div>
                          <Text size="sm" fw={500}>
                            {charge.name}
                          </Text>
                          <Text size="xs" color="dimmed">
                            {charge.frequency.toLowerCase().replace("_", " ")} •{" "}
                            {charge.mandatory ? "Mandatory" : "Optional"}
                          </Text>
                        </div>
                        <Text fw={500}>
                          <NumberFormatter
                            value={charge.amount}
                            prefix="$"
                            thousandSeparator
                          />
                        </Text>
                      </Group>
                    ))
                  ) : (
                    <Text color="dimmed" size="sm">
                      No additional charges
                    </Text>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="media" pt="md">
          <Stack gap="xl">
            {/* Images */}
            <Paper p="lg" radius="md" shadow="sm">
              <Stack gap="md">
                <Title order={4}>Images ({images.length})</Title>
                <SimpleGrid cols={4} spacing="md">
                  {images.map((image) => (
                    <Card key={image.id} p="xs" radius="md">
                      <Card.Section>
                        <Image
                          src={image.url || "/placeholder.svg"}
                          height={120}
                          fit="cover"
                        />
                      </Card.Section>
                      <Text size="xs" mt="xs" ta="center">
                        {image.title}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Stack>
            </Paper>

            {/* Videos */}
            {videos.length > 0 && (
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Videos ({videos.length})</Title>
                  <SimpleGrid cols={2} spacing="md">
                    {videos.map((video) => (
                      <Card key={video.id} p="md" radius="md">
                        <Group gap="md">
                          <ThemeIcon
                            size="xl"
                            variant="light"
                            color={theme.primaryColor}
                          >
                            <IconVideo size={24} />
                          </ThemeIcon>
                          <div style={{ flex: 1 }}>
                            <Text fw={500}>{video.title}</Text>
                            <Text size="sm" color="dimmed">
                              Property Tour Video
                            </Text>
                          </div>
                          <ActionIcon
                            variant="outline"
                            color={theme.primaryColor}
                          >
                            <IconExternalLink size={16} />
                          </ActionIcon>
                        </Group>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Stack>
              </Paper>
            )}

            {/* Documents */}
            {documents.length > 0 && (
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Documents ({documents.length})</Title>
                  <Stack gap="xs">
                    {documents.map((doc) => (
                      <Group
                        key={doc.id}
                        justify="space-between"
                        p="md"
                        style={{
                          border: `1px solid ${
                            isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                          }`,
                          borderRadius: theme.radius.sm,
                        }}
                      >
                        <Group gap="md">
                          <ThemeIcon variant="light" color={theme.primaryColor}>
                            {getMediaIcon(doc.mediaType)}
                          </ThemeIcon>
                          <div>
                            <Text fw={500}>{doc.title}</Text>
                            <Text size="sm" color="dimmed">
                              {doc.mediaType.replace("_", " ")}
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <ActionIcon
                            variant="outline"
                            color={theme.primaryColor}
                          >
                            <IconDownload size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="outline"
                            color={theme.primaryColor}
                          >
                            <IconExternalLink size={16} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="history" pt="md">
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Status History</Title>
              <Timeline
                active={mockListing.statusHistory.length - 1}
                bulletSize={24}
                lineWidth={2}
              >
                {mockListing.statusHistory.map((history, index) => (
                  <Timeline.Item
                    key={index}
                    bullet={
                      <ThemeIcon
                        size={24}
                        variant="filled"
                        color={getStatusColor(history.newStatus)}
                        radius="xl"
                      >
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                    title={history.newStatus.replace("_", " ")}
                  >
                    <Text color="dimmed" size="sm">
                      {new Date(history.createdAt).toLocaleDateString()} at{" "}
                      {new Date(history.createdAt).toLocaleTimeString()}
                    </Text>
                    {history.reason && (
                      <Text size="sm" mt="xs">
                        {history.reason}
                      </Text>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
