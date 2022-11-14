import { Container, Stack, Text } from '@mantine/core';
import { Logo } from '@src/core';
import dayjs from 'dayjs';

import useStyles from './FooterLayout.styles';

export const FooterLayout = () => {
  const { classes } = useStyles();
  const year = dayjs().get('year');

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Stack>
          <Logo size={28} />
          <Text color="white" size="xs">
            An unofficial retrospective of your Netflix viewing history.
          </Text>
        </Stack>
        <Text color="white" size="xs">
          &copy; {year} Christopher Lang
        </Text>
      </Container>
    </div>
  );
};
