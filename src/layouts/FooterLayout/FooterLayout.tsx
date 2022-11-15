import { Container, Group, Space, Text } from '@mantine/core';
import { Logo } from '@src/core';
import dayjs from 'dayjs';

import useStyles from './FooterLayout.styles';

export const FooterLayout = () => {
  const { classes } = useStyles();
  const year = dayjs().get('year');

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo size={28} />
        <Space h="md" />
        <Group position="apart">
          <Text color="white" size="xs">
            An unofficial retrospective of your Netflix viewing history.
          </Text>
          <Text color="white" size="xs">
            &copy; {year} Christopher Lang
          </Text>
        </Group>
      </Container>
    </div>
  );
};
