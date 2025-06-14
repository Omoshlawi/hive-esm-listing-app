import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Menu,
  Paper,
  Progress,
  RingProgress,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconActivity,
  IconChartBar,
  IconCheck,
  IconClipboardList,
  IconDots,
  IconDownload,
  IconEdit,
  IconEye,
  IconHome,
  IconInfoCircle,
  IconMail,
  IconMessageCircle,
  IconPhone,
  IconPhoto,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconShare,
  IconTrash,
  IconUpload,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import React, { FC, useState } from "react";
import { Listing } from "../../types";
import ListingGalary from "./ListingGalary";

// Enhanced mock data for dashboard
const mockListing = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Luxury Downtown Penthouse with City Views",
  description:
    "Experience urban luxury in this stunning penthouse featuring floor-to-ceiling windows, premium finishes, and breathtaking city skyline views.",
  type: "SALE",
  status: "APPROVED",
  price: 1250000,
  coverImage: "/placeholder.svg?height=400&width=600",
  featured: true,
  listedDate: "2024-01-15T00:00:00Z",
  expiryDate: "2024-07-15T00:00:00Z",
  views: 1247,
  tags: ["luxury", "penthouse", "downtown", "city-view", "modern"],

  // Dashboard-specific data
  analytics: {
    totalViews: 1247,
    uniqueViews: 892,
    viewsThisWeek: 156,
    viewsLastWeek: 134,
    inquiries: 23,
    inquiriesThisWeek: 5,
    favorites: 67,
    shares: 12,
    conversionRate: 1.8,
    averageTimeOnPage: "3:24",
    topSources: [
      { source: "Direct", visits: 456, percentage: 36.6 },
      { source: "Google", visits: 312, percentage: 25.0 },
      { source: "Social Media", visits: 234, percentage: 18.8 },
      { source: "Referral", visits: 245, percentage: 19.6 },
    ],
  },

  leads: [
    {
      id: "lead-1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      status: "HOT",
      source: "Website",
      lastContact: "2024-01-20T10:30:00Z",
      notes: "Very interested, wants to schedule viewing",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "lead-2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      status: "WARM",
      source: "Social Media",
      lastContact: "2024-01-19T14:15:00Z",
      notes: "Asked about financing options",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "lead-3",
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1 (555) 456-7890",
      status: "COLD",
      source: "Google",
      lastContact: "2024-01-18T09:45:00Z",
      notes: "Initial inquiry, no follow-up yet",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],

  activities: [
    {
      id: "act-1",
      type: "INQUIRY",
      description: "New inquiry from John Smith",
      timestamp: "2024-01-20T10:30:00Z",
      user: "System",
    },
    {
      id: "act-2",
      type: "STATUS_CHANGE",
      description: "Status changed from PENDING to APPROVED",
      timestamp: "2024-01-15T09:00:00Z",
      user: "Admin",
    },
    {
      id: "act-3",
      type: "PRICE_UPDATE",
      description: "Price updated from $1,300,000 to $1,250,000",
      timestamp: "2024-01-14T16:20:00Z",
      user: "Agent",
    },
    {
      id: "act-4",
      type: "MEDIA_UPLOAD",
      description: "3 new photos uploaded",
      timestamp: "2024-01-13T11:15:00Z",
      user: "Agent",
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Schedule property viewing with John Smith",
      priority: "HIGH",
      dueDate: "2024-01-22T00:00:00Z",
      completed: false,
    },
    {
      id: "task-2",
      title: "Update property description",
      priority: "MEDIUM",
      dueDate: "2024-01-25T00:00:00Z",
      completed: false,
    },
    {
      id: "task-3",
      title: "Renew listing photos",
      priority: "LOW",
      dueDate: "2024-01-30T00:00:00Z",
      completed: true,
    },
  ],

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
      mediaType: "VIDEO",
      title: "Property Tour",
      order: 4,
    },
    {
      id: "5",
      url: "/placeholder.svg?height=400&width=600",
      mediaType: "FLOOR_PLAN",
      title: "Floor Plan",
      order: 5,
    },
  ],

  contactPerson: {
    id: "agent-123",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@realestate.com",
    avatar: "/placeholder.svg?height=80&width=80",
  },
};

export const MainDashboardTabs: FC<{ listing: Listing }> = ({ listing }) => {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState("overview");


  const getLeadStatusColor = (status: string) => {
    const colors = {
      HOT: "red",
      WARM: "orange",
      COLD: "blue",
    };
    return colors[status as keyof typeof colors] || "gray";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      HIGH: "red",
      MEDIUM: "yellow",
      LOW: "green",
    };
    return colors[priority as keyof typeof colors] || "gray";
  };

  const viewsData = [
    { date: "2024-01-14", views: 45 },
    { date: "2024-01-15", views: 67 },
    { date: "2024-01-16", views: 52 },
    { date: "2024-01-17", views: 78 },
    { date: "2024-01-18", views: 89 },
    { date: "2024-01-19", views: 94 },
    { date: "2024-01-20", views: 156 },
  ];

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="overview" leftSection={<IconHome size={16} />}>
          Overview
        </Tabs.Tab>
        <Tabs.Tab value="analytics" leftSection={<IconChartBar size={16} />}>
          Analytics
        </Tabs.Tab>
        <Tabs.Tab value="leads" leftSection={<IconUsers size={16} />}>
          Leads ({mockListing.leads.length})
        </Tabs.Tab>
        <Tabs.Tab value="tasks" leftSection={<IconClipboardList size={16} />}>
          Tasks ({mockListing.tasks.filter((t) => !t.completed).length})
        </Tabs.Tab>
        <Tabs.Tab value="media" leftSection={<IconPhoto size={16} />}>
          Media
        </Tabs.Tab>
        <Tabs.Tab value="activity" leftSection={<IconActivity size={16} />}>
          Activity
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" pt="md">
        <ListingGalary listing={listing}/>
      </Tabs.Panel>

      <Tabs.Panel value="analytics" pt="md">
        <Grid gutter="xl">
          <Grid.Col span={12}>
            <Stack gap="xl">
              {/* Views Chart */}
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Views Over Time</Title>
                  {/* <AreaChart
                        h={300}
                        data={viewsData}
                        dataKey="date"
                        series={[{ name: "views", color: primaryColor[6] }]}
                        curveType="linear"
                      /> */}
                </Stack>
              </Paper>

              {/* Traffic Sources */}
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Traffic Sources</Title>
                  <Stack gap="xs">
                    {mockListing.analytics.topSources.map((source, index) => (
                      <Group key={index} justify="space-between">
                        <Text size="sm">{source.source}</Text>
                        <Group gap="xs">
                          <Text size="sm" fw={500}>
                            {source.visits}
                          </Text>
                          <Text size="xs" color="dimmed">
                            ({source.percentage}%)
                          </Text>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={12}>
            <Stack gap="md">
              {/* Performance Metrics */}
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md">
                  <Title order={4}>Performance</Title>
                  <Stack gap="md">
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Unique Views</Text>
                        <Text size="sm" fw={500}>
                          {mockListing.analytics.uniqueViews}
                        </Text>
                      </Group>
                      <Progress
                        value={
                          (mockListing.analytics.uniqueViews /
                            mockListing.analytics.totalViews) *
                          100
                        }
                        color={theme.primaryColor}
                      />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Conversion Rate</Text>
                        <Text size="sm" fw={500}>
                          {mockListing.analytics.conversionRate}%
                        </Text>
                      </Group>
                      <Progress
                        value={mockListing.analytics.conversionRate * 10}
                        color="green"
                      />
                    </div>
                  </Stack>
                </Stack>
              </Paper>

              {/* Engagement Ring */}
              <Paper p="lg" radius="md" shadow="sm">
                <Stack gap="md" align="center">
                  <Title order={4}>Engagement Score</Title>
                  <RingProgress
                    size={120}
                    thickness={12}
                    sections={[
                      { value: 40, color: "blue", tooltip: "Views" },
                      { value: 25, color: "orange", tooltip: "Inquiries" },
                      { value: 15, color: "green", tooltip: "Favorites" },
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        Overall
                        <br />
                        Score: 80%
                      </Text>
                    }
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Tabs.Panel>

      <Tabs.Panel value="leads" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Leads Management</Title>
            <Group gap="xs">
              <TextInput
                placeholder="Search leads..."
                leftSection={<IconSearch size={16} />}
                size="sm"
              />
              <Button leftSection={<IconUserPlus size={16} />} size="sm">
                Add Lead
              </Button>
            </Group>
          </Group>

          <SimpleGrid cols={1} spacing="md">
            {mockListing.leads.map((lead) => (
              <Paper key={lead.id} p="lg" radius="md" shadow="sm">
                <Grid gutter="md" align="center">
                  <Grid.Col span="auto">
                    <Group gap="md">
                      <Avatar src={lead.avatar} size="md" />
                      <div>
                        <Text fw={500}>{lead.name}</Text>
                        <Text size="sm" color="dimmed">
                          {lead.email}
                        </Text>
                        <Text size="sm" color="dimmed">
                          {lead.phone}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>

                  <Grid.Col span="content">
                    <Stack gap="xs" align="center">
                      <Badge
                        color={getLeadStatusColor(lead.status)}
                        variant="light"
                      >
                        {lead.status}
                      </Badge>
                      <Text size="xs" color="dimmed">
                        {lead.source}
                      </Text>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span="content">
                    <Stack gap="xs">
                      <Text size="sm" fw={500}>
                        Last Contact
                      </Text>
                      <Text size="xs" color="dimmed">
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </Text>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span={3}>
                    <Text size="sm">{lead.notes}</Text>
                  </Grid.Col>

                  <Grid.Col span="content">
                    <Group gap="xs">
                      <ActionIcon variant="outline" color="blue">
                        <IconPhone size={16} />
                      </ActionIcon>
                      <ActionIcon variant="outline" color="green">
                        <IconMail size={16} />
                      </ActionIcon>
                      <ActionIcon variant="outline" color={theme.primaryColor}>
                        <IconMessageCircle size={16} />
                      </ActionIcon>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="tasks" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Tasks & Reminders</Title>
            <Button leftSection={<IconPlus size={16} />} size="sm">
              Add Task
            </Button>
          </Group>

          <Stack gap="xs">
            {mockListing.tasks.map((task) => (
              <Paper key={task.id} p="md" radius="md" shadow="sm">
                <Group justify="space-between">
                  <Group gap="md">
                    <Switch
                      checked={task.completed}
                      onChange={() => {}}
                      color={theme.primaryColor}
                    />
                    <div>
                      <Text
                        fw={500}
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          opacity: task.completed ? 0.6 : 1,
                        }}
                      >
                        {task.title}
                      </Text>
                      <Group gap="xs">
                        <Badge
                          size="xs"
                          color={getPriorityColor(task.priority)}
                        >
                          {task.priority}
                        </Badge>
                        <Text size="xs" color="dimmed">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </Text>
                      </Group>
                    </div>
                  </Group>
                  <ActionIcon variant="subtle">
                    <IconDots size={16} />
                  </ActionIcon>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="media" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Media Management</Title>
            <Button leftSection={<IconUpload size={16} />} size="sm">
              Upload Media
            </Button>
          </Group>

          <SimpleGrid cols={4} spacing="md">
            {mockListing.media.map((media) => (
              <Card key={media.id} p="xs" radius="md" shadow="sm">
                <Card.Section>
                  <Image
                    src={media.url || "/placeholder.svg"}
                    height={120}
                    fit="cover"
                  />
                </Card.Section>
                <Stack gap="xs" mt="xs">
                  <Group justify="space-between" align="flex-start">
                    <Text size="xs" fw={500}>
                      {media.title}
                    </Text>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon size="xs" variant="subtle">
                          <IconDots size={12} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<IconEdit size={12} />}>
                          Edit
                        </Menu.Item>
                        <Menu.Item leftSection={<IconDownload size={12} />}>
                          Download
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconTrash size={12} />}
                          color="red"
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                  <Badge size="xs" variant="outline">
                    {media.mediaType}
                  </Badge>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="activity" pt="md">
        <Paper p="lg" radius="md" shadow="sm">
          <Stack gap="md">
            <Title order={4}>Activity Timeline</Title>
            <Timeline
              active={mockListing.activities.length}
              bulletSize={24}
              lineWidth={2}
            >
              {mockListing.activities.map((activity, index) => (
                <Timeline.Item
                  key={activity.id}
                  bullet={
                    <ThemeIcon
                      size={24}
                      variant="filled"
                      color={theme.primaryColor}
                      radius="xl"
                    >
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                  title={activity.description}
                >
                  <Text color="dimmed" size="sm">
                    {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                    {new Date(activity.timestamp).toLocaleTimeString()} by{" "}
                    {activity.user}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>
        </Paper>
      </Tabs.Panel>
    </Tabs>
  );
};
