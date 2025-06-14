import { TablerIcon } from "@hive/esm-core-components";
import {
  SimpleGrid,
  Paper,
  Group,
  ThemeIcon,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowUp,
  IconMessage,
  IconTarget,
  IconClock,
} from "@tabler/icons-react";
import React, { FC } from "react";
import { Listing } from "../../types";

const AnalyticsOverview: FC<{ listing: Listing }> = ({
  listing: mockListing,
}) => {
  const theme = useMantineTheme();

  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      //   breakpoints={[
      //     { maxWidth: "md", cols: 2 },
      //     { maxWidth: "sm", cols: 1 },
      //   ]}
    >
      <Paper p="lg" radius="md" shadow="sm">
        <Group justify="space-between" mb="xs">
          <Text size="sm" color="dimmed">
            Total Views
          </Text>
          <ThemeIcon variant="light" color="blue" size="sm">
            <TablerIcon name="eye" size={14} />
          </ThemeIcon>
        </Group>
        <Text size="xl" fw={700}>
          {(10000).toLocaleString()}
        </Text>
        <Group gap="xs" mt="xs">
          <TablerIcon name="arrowUp" size={14} color={theme.colors.green[6]} />
          <Text size="xs" color="green">
            +
            {/* {(
              ((mockListing.analytics.viewsThisWeek -
                mockListing.analytics.viewsLastWeek) /
                mockListing.analytics.viewsLastWeek) *
              100
            ).toFixed(1)} */}
            20 % from last week
          </Text>
        </Group>
      </Paper>

      <Paper p="lg" radius="md" shadow="sm">
        <Group justify="space-between" mb="xs">
          <Text size="sm" color="dimmed">
            Inquiries
          </Text>
          <ThemeIcon variant="light" color="orange" size="sm">
            <IconMessage size={14} />
          </ThemeIcon>
        </Group>
        <Text size="xl" fw={700}>
          {1000}
        </Text>
        <Group gap="xs" mt="xs">
          <TablerIcon name="arrowUp" size={14} color={theme.colors.green[6]} />
          <Text size="xs" color="green">
            {1000} this week
          </Text>
        </Group>
      </Paper>

      <Paper p="lg" radius="md" shadow="sm">
        <Group justify="space-between" mb="xs">
          <Text size="sm" color="dimmed">
            Conversion Rate
          </Text>
          <ThemeIcon variant="light" color="green" size="sm">
            <IconTarget size={14} />
          </ThemeIcon>
        </Group>
        <Text size="xl" fw={700}>
          {1000}%
        </Text>
        <Text size="xs" color="dimmed" mt="xs">
          {100} inquiries / {20} views
        </Text>
      </Paper>

      <Paper p="lg" radius="md" shadow="sm">
        <Group justify="space-between" mb="xs">
          <Text size="sm" color="dimmed">
            Avg. Time on Page
          </Text>
          <ThemeIcon variant="light" color="purple" size="sm">
            <IconClock size={14} />
          </ThemeIcon>
        </Group>
        <Text size="xl" fw={700}>
          {200}
        </Text>
        <Text size="xs" color="dimmed" mt="xs">
          Above average engagement
        </Text>
      </Paper>
    </SimpleGrid>
  );
};

export default AnalyticsOverview;
