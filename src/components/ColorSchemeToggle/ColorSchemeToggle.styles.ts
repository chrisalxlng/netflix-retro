import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  icon: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
  },
}));
