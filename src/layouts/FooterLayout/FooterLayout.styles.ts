import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    paddingTop: 20,
    borderTop: `1px solid ${theme.colors.dark[5]}`,
    backgroundColor: 'black',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
}));
