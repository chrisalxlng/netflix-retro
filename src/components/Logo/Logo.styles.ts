import { createStyles, keyframes } from '@mantine/core';

export default createStyles(() => {
  const fadeToTransparency = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0, display: 'none' },
  });

  const fadeToVisibility = keyframes({
    from: { opacity: 0, display: 'block' },
    to: { opacity: 1 },
  });

  return {
    hidden: {
      display: 'none',
    },

    transparent: {
      display: 'none',
      opacity: 0,
      animation: `${fadeToTransparency} 0.3s ease-in-out forwards`,
    },

    visible: {
      display: 'block',
      opacity: 1,
      animation: `${fadeToVisibility} 0.3s ease-in-out forwards`,
    },
  };
});
