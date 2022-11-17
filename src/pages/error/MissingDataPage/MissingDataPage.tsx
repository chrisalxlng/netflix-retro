import { Button, Center, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import useStyles from './MissingDataPage.styles';

export const MissingDataPage = () => {
  const { classes } = useStyles();

  return (
    <Center className={classes.root}>
      <Container>
        <Title className={classes.title}>Missing Data</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this page cannot be visited right now. You may have uploaded a file in an
          unsupported language or manually typed in this address, therefore skipping to provide
          necessary data.
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
