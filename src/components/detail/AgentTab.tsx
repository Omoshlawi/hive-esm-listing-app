import React, { FC } from "react";
import { Listing } from "../../types";
import {
  Grid,
  Paper,
  Stack,
  Group,
  Avatar,
  Title,
  Rating,
  Badge,
  Button,
  TextInput,
  Textarea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconSend,
} from "@tabler/icons-react";
import { useContactPerson } from "../../hooks/useUsers";
import { getHiveFileUrl } from "@hive/esm-core-api";
import { openModal } from "@mantine/modals";
import ContactForm from "../../forms/ContactForm";

type Props = {
  listing: Listing;
};

const specialties = [
  "Luxury Properties",
  "Downtown Area",
  "Investment Properties",
];

const AgentTab: FC<Props> = ({ listing }) => {
  const { contactPerson, error, isLoading } = useContactPerson(
    listing.contactPersonId
  );
  const theme = useMantineTheme();
  const primaryColor = theme.colors[theme.primaryColor];
  const gradientFrom = primaryColor[6];
  const gradientTo = primaryColor[8];

  const handleLaunchContactDialogForm = () => {
    openModal({
      title: "Contact Agent",
      size: "md",
      children: <ContactForm contactPerson={contactPerson} />,
    });
  };
  if (error || isLoading) return null;
  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Paper p="lg" radius="md" shadow="sm">
          <Stack gap="md">
            <Group gap="lg">
              <Avatar
                src={
                  contactPerson.person.avatarUrl
                    ? getHiveFileUrl(contactPerson.person.avatarUrl)
                    : null
                }
                size="xl"
              />
              <div style={{ flex: 1 }}>
                <Title order={3}>{contactPerson.person.name}</Title>
                <Text c="dimmed" size="lg">
                  {"contactPerson.title"}
                </Text>
                <Text c="dimmed">{"contactPerson.company"}</Text>
                <Group gap="md" mt="xs">
                  <Group gap="xs">
                    <Rating
                      //   value={contactPerson.rating}
                      value={4}
                      fractions={2}
                      readOnly
                    />
                    <Text size="sm" c="dimmed">
                      ({"contactPerson.rating"}) • {"contactPerson.totalSales"}{" "}
                      sales
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {"contactPerson.yearsExperience"} years experience
                  </Text>
                </Group>
              </div>
            </Group>

            <Text>{"contactPerson.bio"}</Text>

            <div>
              <Text fw={500} mb="xs">
                Specialties
              </Text>
              <Group gap="xs">
                {specialties.map((specialty, index) => (
                  <Badge key={index} variant="light" color={theme.primaryColor}>
                    {specialty}
                  </Badge>
                ))}
              </Group>
            </div>

            <Group gap="md">
              <Button
                leftSection={<IconPhone size={16} />}
                onClick={handleLaunchContactDialogForm}
              >
                Call {contactPerson.person.phoneNumber}
              </Button>
              <Button
                variant="outline"
                leftSection={<IconMail size={16} />}
                component="a"
                href={`mailto:${contactPerson.person.email}`}
              >
                Email Agent
              </Button>
              <Button
                variant="outline"
                color="green"
                leftSection={<IconBrandWhatsapp size={16} />}
              >
                WhatsApp
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Paper p="lg" radius="md" shadow="sm">
          <Stack gap="md">
            <Title order={4}>Contact Agent</Title>
            <Stack gap="xs">
              <TextInput placeholder="Your name" />
              <TextInput placeholder="Your email" type="email" />
              <TextInput placeholder="Your phone" />
              <Textarea placeholder="Your message..." rows={4} />
              <Button fullWidth leftSection={<IconSend size={16} />}>
                Send Message
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default AgentTab;
