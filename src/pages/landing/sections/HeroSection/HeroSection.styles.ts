import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  hero: {
    position: 'relative',
    padding: `180px ${theme.spacing.xl}px 130px ${theme.spacing.xl}px`,
    backgroundImage: 'url(assets/hero-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 120,
      paddingBottom: 80,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
      marginBottom: theme.spacing.xl * 1,
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][8],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    gap: 30,

    '@media (max-width: 520px)': {
      marginTop: theme.spacing.xl * 4,
      flexDirection: 'column',
      gap: 15,
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,
  },

  secondaryControl: {
    padding: 0,

    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },

    '@media (max-width: 520px)': {
      height: 20,
    },
  },

  separator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
}));
