import { getHiveFileUrl, User } from "@hive/esm-core-api";
import {
  Stack,
  Group,
  Avatar,
  Rating,
  Divider,
  Button,
  Text,
} from "@mantine/core";
import { IconPhone, IconMail, IconBrandWhatsapp } from "@tabler/icons-react";
import React, { FC } from "react";

type Props = {
  contactPerson: User;
};

const ContactForm: FC<Props> = ({ contactPerson }) => {
  return (
    <Stack gap="md">
      <Group gap="md">
        <Avatar
          src={
            contactPerson.person.avatarUrl
              ? getHiveFileUrl(contactPerson.person.avatarUrl)
              : null
          }
          size="lg"
        />
        <div>
          <Text fw={500} size="lg">
            {contactPerson.person.name}
          </Text>
          <Text color="dimmed">{"contactPerson.title"}</Text>
          <Group gap="xs" mt="xs">
            <Rating
              //   value={contactPerson.rating}
              value={4}
              fractions={2}
              readOnly
              size="sm"
            />
            <Text size="sm" c="dimmed">
              ({"contactPerson.rating"})
            </Text>
          </Group>
        </div>
      </Group>

      <Divider />

      <Stack gap="xs">
        <Button
          fullWidth
          leftSection={<IconPhone size={16} />}
          component="a"
          href={`tel:${contactPerson.person.phoneNumber}`}
        >
          Call {contactPerson.person.phoneNumber}
        </Button>
        <Button
          fullWidth
          variant="outline"
          leftSection={<IconMail size={16} />}
          component="a"
          href={`mailto:${contactPerson.person.email}`}
        >
          Email {contactPerson.person.email}
        </Button>
        <Button
          fullWidth
          variant="outline"
          color="green"
          leftSection={<IconBrandWhatsapp size={16} />}
        >
          WhatsApp
        </Button>
      </Stack>
    </Stack>
  );
};

export default ContactForm;
