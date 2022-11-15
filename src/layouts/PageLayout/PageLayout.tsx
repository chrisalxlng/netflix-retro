import { AppShell, Box, Group, Header as MantineHeader } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Logo } from '@src/core';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FooterLayout } from '../FooterLayout/FooterLayout';
import useStyles from './PageLayout.styles';

type HeaderProps = {
  logoCondensed?: boolean;
};

type PageLayoutProps = {
  children: ReactNode[] | ReactNode;
};

const HEADER_HEIGHT = 50;

const Header = ({ logoCondensed = false }: HeaderProps) => {
  const { classes } = useStyles();

  return (
    <MantineHeader className={classes.header} height={HEADER_HEIGHT} withBorder={false}>
      <Group className={classes.container} align="center" px="md" py="xs">
        <Link href="/" passHref>
          <Box component="a" className={classes.logo}>
            <Logo condensed={logoCondensed} enableAnimation />
          </Box>
        </Link>
      </Group>
    </MantineHeader>
  );
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { classes } = useStyles();
  const [scroll] = useWindowScroll();
  const isVerticallyScrolled = scroll.y > HEADER_HEIGHT;

  return (
    <AppShell
      header={<Header logoCondensed={isVerticallyScrolled} />}
      footer={<FooterLayout />}
      padding={0}
      sx={{ marginTop: -HEADER_HEIGHT }}
    >
      <div className={classes.content}>{children}</div>
    </AppShell>
  );
};
