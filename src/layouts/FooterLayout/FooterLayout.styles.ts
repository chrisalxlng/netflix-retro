import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    paddingTop: 20,
    borderTop: `1px solid ${theme.colors.dark[5]}`,
    backgroundColor: 'black',
  },

  inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));
