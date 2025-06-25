import {
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Paper,
  Image,
  ThemeIcon,
  Divider,
  SimpleGrid,
  Card,
  Tabs,
  ActionIcon,
  Avatar,
  NumberFormatter,
  Modal,
  useMantineTheme,
  useMantineColorScheme,
  Box,
  Table,
  Anchor,
  Tooltip,
  Alert,
  Rating,
  Textarea,
  TextInput,
  Select,
} from "@mantine/core";
import {
  IconBed,
  IconBath,
  IconRuler,
  IconMapPin,
  IconCalendar,
  IconCoin,
  IconHeart,
  IconShare,
  IconPhone,
  IconMail,
  IconEye,
  IconCar,
  IconBuildingEstate,
  IconKey,
  IconShield,
  IconCheck,
  IconUser,
  IconUsers,
  IconHome,
  IconBrandWhatsapp,
  IconPhoto,
  IconTrendingUp,
  IconInfoCircle,
  IconCalculator,
  IconPrinter,
  IconArrowLeft,
  IconMaximize,
  IconMessage,
  IconSend,
  IconMapPinFilled,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconCopy,
  IconSchool,
  IconBus,
  IconShoppingCart,
  IconStethoscope,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useParams } from "react-router";
import { useListing } from "../hooks";
import HeaderSection from "../components/detail/HeaderSection";
import MediaGalary from "../components/detail/MediaGalary";
import { Link } from "react-router-dom";
import SimilarListings from "../components/detail/SimilarListings";
import OverviewTab from "../components/detail/OverviewTab";
import DetailsTab from "../components/detail/DetailsTab";
import LocationTab from "../components/detail/LocationTab";
import FinancialsTab from "../components/detail/FinancialsTab";
import AgentTab from "../components/detail/AgentTab";

// Enhanced mock data for public view
const mockListing = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Luxury Downtown Penthouse with City Views",
  description:
    "Experience urban luxury in this stunning penthouse featuring floor-to-ceiling windows, premium finishes, and breathtaking city skyline views. This exceptional property offers the perfect blend of modern sophistication and comfortable living in the heart of the city.",
  type: "SALE",
  status: "APPROVED",
  price: 1250000,
  coverImage: "/placeholder.svg?height=500&width=800",
  featured: true,
  listedDate: "2024-01-15T00:00:00Z",
  expiryDate: "2024-07-15T00:00:00Z",
  views: 1247,
  tags: ["luxury", "penthouse", "downtown", "city-view", "modern"],

  property: {
    address: "123 Skyline Avenue, Downtown District, Metro City",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 2400,
    yearBuilt: 2020,
    parkingSpaces: 2,
    propertyType: "Penthouse",
    floorNumber: 25,
    totalFloors: 30,
    furnished: "Semi-furnished",
    petPolicy: "Pets allowed with deposit",
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "24/7 Concierge",
      "Rooftop Terrace",
      "Wine Cellar",
      "Valet Parking",
      "Business Center",
      "Guest Suites",
      "Private Elevator",
      "Smart Home System",
      "Floor-to-ceiling Windows",
      "Premium Appliances",
      "Walk-in Closets",
      "Marble Bathrooms",
    ],
    nearbyPlaces: [
      {
        name: "Metro Central Station",
        distance: "0.3 miles",
        type: "transport",
        icon: IconBus,
      },
      {
        name: "Downtown Elementary",
        distance: "0.5 miles",
        type: "education",
        icon: IconSchool,
      },
      {
        name: "City General Hospital",
        distance: "0.8 miles",
        type: "healthcare",
        icon: IconStethoscope,
      },
      {
        name: "Grand Shopping Mall",
        distance: "0.4 miles",
        type: "shopping",
        icon: IconShoppingCart,
      },
    ],
  },

  saleDetails: {
    downPayment: 250000,
    priceNegotiable: true,
    ownershipType: { name: "Freehold", description: "Full ownership rights" },
    titleDeedReady: true,
    financingOptions: [
      {
        option: {
          name: "Cash",
          description: "Full cash payment with 5% discount",
        },
      },
      {
        option: {
          name: "Mortgage",
          description: "Bank financing available up to 80% LTV",
        },
      },
      {
        option: {
          name: "Installments",
          description: "Developer financing over 5 years",
        },
      },
    ],
    monthlyMortgage: 5200, // Estimated
    propertyTax: 15000, // Annual
    hoaFees: 450, // Monthly
  },

  media: [
    {
      id: "1",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Living Room",
      order: 1,
    },
    {
      id: "2",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Master Bedroom",
      order: 2,
    },
    {
      id: "3",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Kitchen",
      order: 3,
    },
    {
      id: "4",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Bathroom",
      order: 4,
    },
    {
      id: "5",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Balcony View",
      order: 5,
    },
    {
      id: "6",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "IMAGE",
      title: "Building Exterior",
      order: 6,
    },
    {
      id: "7",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "VIDEO",
      title: "Property Tour",
      order: 7,
    },
    {
      id: "8",
      url: "/placeholder.svg?height=500&width=800",
      mediaType: "FLOOR_PLAN",
      title: "Floor Plan",
      order: 8,
    },
  ],

  additionalCharges: [
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
  ],

  contactPerson: {
    id: "agent-123",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    company: "Premium Properties Inc.",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@realestate.com",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    totalSales: 127,
    yearsExperience: 8,
    specialties: [
      "Luxury Properties",
      "Downtown Area",
      "Investment Properties",
    ],
    bio: "Sarah is a dedicated real estate professional with over 8 years of experience in luxury property sales. She specializes in downtown properties and has helped over 127 families find their dream homes.",
  },
};
function PublicListingDetailPage() {
  const { listingId } = useParams<{ listingId: string }>();
  const { listing, error, isLoading, mutate } = useListing(listingId);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [
    contactModalOpen,
    { open: openContactModal, close: closeContactModal },
  ] = useDisclosure(false);

  const [
    calculatorModalOpen,
    { open: openCalculatorModal, close: closeCalculatorModal },
  ] = useDisclosure(false);
  const [shareModalOpen, { open: openShareModal, close: closeShareModal }] =
    useDisclosure(false);
  const [
    galleryModalOpen,
    { open: openGalleryModal, close: closeGalleryModal },
  ] = useDisclosure(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    visitDate: "",
    visitTime: "",
  });

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
    };
    return colors[status as keyof typeof colors] || "gray";
  };

  const images = mockListing.media.filter((m) => m.mediaType === "IMAGE");
  const videos = mockListing.media.filter((m) => m.mediaType === "VIDEO");
  const documents = mockListing.media.filter(
    (m) => m.mediaType !== "IMAGE" && m.mediaType !== "VIDEO"
  );

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = mockListing.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        // Show copied notification
        break;
    }
  };

  if (isLoading || error) return null;

  return (
    <Container size="100%" px={0}>
      <Stack gap="xl">
        {/* Back Navigation */}
        <Group gap="xs">
          <ActionIcon variant="subtle" size="lg">
            <IconArrowLeft size={18} />
          </ActionIcon>
          <Anchor to="/listings" size="sm" component={Link}>
            Back to listings
          </Anchor>
        </Group>

        {/* Header Section */}
        <HeaderSection listing={listing} />
        {/* Media Gallery */}
        <MediaGalary listing={listing} />

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
            <Tabs.Tab value="location" leftSection={<IconMapPin size={16} />}>
              Location
            </Tabs.Tab>
            <Tabs.Tab value="financials" leftSection={<IconCoin size={16} />}>
              Financials
            </Tabs.Tab>
            <Tabs.Tab value="agent" leftSection={<IconUser size={16} />}>
              Agent
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="md">
            <OverviewTab listing={listing} />
          </Tabs.Panel>

          <Tabs.Panel value="details" pt="md">
            <DetailsTab listing={listing} />
          </Tabs.Panel>

          <Tabs.Panel value="location" pt="md">
            <LocationTab listing={listing} />
          </Tabs.Panel>

          <Tabs.Panel value="financials" pt="md">
            <FinancialsTab listing={listing} />
          </Tabs.Panel>

          <Tabs.Panel value="agent" pt="md">
            <AgentTab listing={listing}/>
          </Tabs.Panel>
        </Tabs>

        {/* Similar Properties */}
        <SimilarListings listing={listing} />

        {/* Modals */}

        {/* Share Modal */}
        <Modal
          opened={shareModalOpen}
          onClose={closeShareModal}
          title="Share Property"
          size="sm"
        >
          <Stack gap="md">
            <Text size="sm" color="dimmed">
              Share this property with others
            </Text>
            <Group grow>
              <Button
                variant="outline"
                leftSection={<IconBrandFacebook size={16} />}
                onClick={() => handleShare("facebook")}
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                leftSection={<IconBrandTwitter size={16} />}
                onClick={() => handleShare("twitter")}
              >
                Twitter
              </Button>
            </Group>
            <Group grow>
              <Button
                variant="outline"
                leftSection={<IconBrandLinkedin size={16} />}
                onClick={() => handleShare("linkedin")}
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                leftSection={<IconCopy size={16} />}
                onClick={() => handleShare("copy")}
              >
                Copy Link
              </Button>
            </Group>
          </Stack>
        </Modal>
    
      </Stack>
    </Container>
  );
}

export default PublicListingDetailPage;
