import { createStyles, keyframes } from '@mantine/core';

export default createStyles(() => {
  const fadeToVisibility = keyframes({
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  });

  return {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 50,
    },

    heading: {
      lineHeight: 1.3,
    },

    subheading: {
      lineHeight: 1.2,
    },

    transparent: {
      opacity: 0,
      transform: 'translateY(10px)',
    },

    visible: {
      opacity: 1,
      transform: 'translateY(0px)',
      animation: `${fadeToVisibility} 1.5s ease-in-out`,
    },
  };
});
