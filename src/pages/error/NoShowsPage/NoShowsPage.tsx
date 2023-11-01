import { Button, Center, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import useStyles from './NoShowsPage.styles';

export const NoShowsPage = () => {
  const { classes } = useStyles();

  return (
    <Center className={classes.root}>
      <Container>
        <Title className={classes.title}>No Shows</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this page cannot be visited right now. Your uploaded file does not contain
          any data from the current year.
        </Text>
        <Group position="center">
          <Link href="/" passHref>
            <Button component="a" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </Center>
  );
};
