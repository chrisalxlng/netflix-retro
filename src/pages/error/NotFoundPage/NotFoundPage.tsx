import { Button, Center, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import useStyles from './NotFoundPage.styles';

export const NotFoundPage = () => {
  const { classes } = useStyles();

  return (
    <Center className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this page could not be accessed. You may have mistyped the address, or the
          page has been moved to another URL.
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
