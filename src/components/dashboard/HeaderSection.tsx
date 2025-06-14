import React, { FC } from "react";
import {
  Paper,
  Grid,
  Stack,
  Group,
  Badge,
  Title,
  Menu,
  Text,
  ActionIcon,
  useComputedColorScheme,
  useMantineTheme,
  Button,
  NumberFormatter,
  Select,
  Textarea,
  TextInput,
  Switch,
} from "@mantine/core";
import { getStatusColor } from "../../utils/helpers";
import { Listing } from "../../types";
import { TablerIcon } from "@hive/esm-core-components";
import { closeModal, openModal } from "@mantine/modals";

const HeaderSection: FC<{ listing: Listing }> = ({ listing }) => {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];

  const handleChangeStatus = () => {
    const id = openModal({
      children: (
        <Stack gap="md">
          <Select
            label="New Status"
            defaultValue={listing.status}
            data={[
              { value: "DRAFT", label: "Draft" },
              { value: "PENDING", label: "Pending Review" },
              { value: "APPROVED", label: "Approved & Live" },
              { value: "REJECTED", label: "Rejected" },
              { value: "UNDER_CONTRACT", label: "Under Contract" },
              { value: "SOLD", label: "Sold" },
              { value: "WITHDRAWN", label: "Withdrawn" },
              { value: "EXPIRED", label: "Expired" },
            ]}
          />
          <Textarea
            label="Reason for Change"
            placeholder="Optional reason..."
          />
          <Group justify="flex-end" gap="xs">
            <Button variant="outline" onClick={() => closeModal(id)}>
              Cancel
            </Button>
            <Button>Update Status</Button>
          </Group>
        </Stack>
      ),
    });
  };
  const handleEditListing = () => {
    const id = openModal({
      children: (
        <Stack gap="md">
          <TextInput label="Title" defaultValue={listing.title} />
          <Textarea
            label="Description"
            defaultValue={listing.description}
            rows={4}
          />
          <Group grow>
            <TextInput
              label="Price"
              defaultValue={listing.price.toString()}
              leftSection="$"
            />
            <Select
              label="Status"
              defaultValue={listing.status}
              data={[
                { value: "DRAFT", label: "Draft" },
                { value: "PENDING", label: "Pending" },
                { value: "APPROVED", label: "Approved" },
                { value: "REJECTED", label: "Rejected" },
              ]}
            />
          </Group>
          <Switch label="Featured Listing" defaultChecked={listing.featured} />
          <Group justify="flex-end" gap="xs">
            <Button variant="outline" onClick={() => closeModal(id)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Paper p="xl" radius="lg" shadow="sm">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12 }}>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Group gap="xs">
                  <Badge
                    variant="filled"
                    color={getStatusColor(listing.status)}
                    size="lg"
                  >
                    {listing.status.replace("_", " ")}
                  </Badge>
                  {listing.featured && (
                    <Badge
                      variant="gradient"
                      gradient={{ from: gradientFrom, to: gradientTo }}
                    >
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" color={theme.primaryColor}>
                    {listing.type}
                  </Badge>
                </Group>
                <Title order={1} size="h2">
                  {listing.title}
                </Title>
                <Text size="sm" color="dimmed">
                  ID: {listing.id}
                </Text>
              </Stack>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="outline" size="lg">
                    <TablerIcon name="dots" size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<TablerIcon name="edit" size={14} />}
                    onClick={handleEditListing}
                  >
                    Edit Listing
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<TablerIcon name="settings" size={14} />}
                    onClick={handleChangeStatus}
                  >
                    Change Status
                  </Menu.Item>
                  <Menu.Item leftSection={<TablerIcon name="copy" size={14} />}>
                    Duplicate
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<TablerIcon name="share" size={14} />}
                  >
                    Share
                  </Menu.Item>
                  <Menu.Item leftSection={<TablerIcon name="eye" size={14} />}>
                    Preview
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<TablerIcon name="trash" size={14} />}
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Group gap="xl">
              <Group gap="xs">
                <TablerIcon name="eye" size={16} />
                <Text size="sm">{10000} total views</Text>
              </Group>
              <Group gap="xs">
                <TablerIcon name="heart" size={16} />
                <Text size="sm">{200000} favorites</Text>
              </Group>
              <Group gap="xs">
                <TablerIcon name="message" size={16} />
                <Text size="sm">{80000} inquiries</Text>
              </Group>
              <Group gap="xs">
                <TablerIcon name="calendar" size={16} />
                <Text size="sm">
                  Listed {new Date(listing.listedDate).toLocaleDateString()}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Paper
            p="lg"
            radius="md"
            style={{
              background: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
            }}
          >
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm" color="dimmed">
                  Listed Price
                </Text>
                <ActionIcon variant="subtle" size="sm">
                  <TablerIcon name="edit" size={14} />
                </ActionIcon>
              </Group>
              <Title order={2} style={{ color: primaryColor[6] }}>
                <NumberFormatter
                  value={listing.price}
                  prefix="$"
                  thousandSeparator
                />
              </Title>

              <Group justify="space-between" gap="xs">
                <Button
                  variant="gradient"
                  gradient={{ from: gradientFrom, to: gradientTo }}
                  size="sm"
                  fullWidth
                  leftSection={<TablerIcon name="edit" size={16} />}
                  onClick={handleEditListing}
                >
                  Edit Listing
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default HeaderSection;
