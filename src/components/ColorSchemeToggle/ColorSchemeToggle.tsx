import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import useStyles from './ColorSchemeToggle.styles';

export const ColorSchemeToggle = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" mt="xl">
      <ActionIcon onClick={() => toggleColorScheme()} size="xl" className={classes.icon}>
        {colorScheme === 'dark' ? (
          <IconSun size={20} stroke={1.5} />
        ) : (
          <IconMoonStars size={20} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
};
