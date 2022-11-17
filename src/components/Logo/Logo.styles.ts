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

      // query to target non-iOS-Safari browsers
      '@supports not (-webkit-touch-callout: none)': {
        animation: `${fadeToTransparency} 0.6s ease-in-out forwards`,
      },
    },

    visible: {
      display: 'block',
      opacity: 1,

      // query to target non-iOS-Safari browsers
      '@supports not (-webkit-touch-callout: none)': {
        animation: `${fadeToVisibility} 0.6s ease-in-out forwards`,
      },
    },
  };
});
