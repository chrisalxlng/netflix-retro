import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[0],
  },

  section: {
    paddingTop: 50,
    paddingBottom: 50,
  },

  twoColumnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 50,

    '> *:nth-of-type(1)': {
      flex: '100%',
    },

    '> *:nth-of-type(2)': {
      flex: '100%',
    },

    '@media (min-width: 900px)': {
      flexDirection: 'row',

      '> *:nth-of-type(1)': {
        flex: '35%',
      },

      '> *:nth-of-type(2)': {
        flex: '65%',
      },
    },
  },

  image: {
    boxShadow: `5px 5px 20px 3px ${theme.colors.gray[7]}`,
    borderRadius: 5,

    'figure img': {
      borderRadius: 5,
    },
  },
}));
