import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  header: {
    backgroundColor: 'transparent',
  },

  container: {
    width: '100%',
    height: '100%',
  },

  logo: {
    cursor: 'pointer',
  },

  content: {
    ' > *': {
      paddingBottom: 100,
    },
  },
}));
