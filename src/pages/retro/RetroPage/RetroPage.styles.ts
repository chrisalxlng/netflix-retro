import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    backgroundImage: theme.fn.gradient({
      from: theme.colors.lime[0],
      to: theme.colors.yellow[0],
      deg: 45,
    }),
  },
}));
