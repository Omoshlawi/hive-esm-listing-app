import {
  Grid,
  Stack,
  Paper,
  Title,
  Group,
  Progress,
  RingProgress,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const analytics = {
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
};

const AnaliticsGrid = () => {
  const theme = useMantineTheme();
  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Stack gap="xl">
          {/* Views Chart */}
          {/* <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Views Over Time</Title>
              <AreaChart
                            h={300}
                            data={viewsData}
                            dataKey="date"
                            series={[{ name: "views", color: primaryColor[6] }]}
                            curveType="linear"
                          />
            </Stack>
          </Paper> */}

          {/* Traffic Sources */}
          <Paper p="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Title order={4}>Traffic Sources</Title>
              <Stack gap="xs">
                {analytics.topSources.map((source, index) => (
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
                      {analytics.uniqueViews}
                    </Text>
                  </Group>
                  <Progress
                    value={(analytics.uniqueViews / analytics.totalViews) * 100}
                    color={theme.primaryColor}
                  />
                </div>

                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Conversion Rate</Text>
                    <Text size="sm" fw={500}>
                      {analytics.conversionRate}%
                    </Text>
                  </Group>
                  <Progress
                    value={analytics.conversionRate * 10}
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
  );
};

export default AnaliticsGrid;
