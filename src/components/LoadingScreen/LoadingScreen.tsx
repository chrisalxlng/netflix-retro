import { Group, Loader } from '@mantine/core';

export const LoadingScreen = () => (
  <Group grow align="center" sx={{ width: '100vw', height: '100vh' }}>
    <Loader />
  </Group>
);
