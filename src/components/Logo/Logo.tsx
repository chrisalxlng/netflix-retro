import { Image } from '@mantine/core';
import useStyles from './Logo.styles';

type LogoProps = {
  condensed?: boolean;
  size?: number;
};

export const Logo = ({ condensed = false, size = 30 }: LogoProps) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <Image
        className={cx(condensed ? classes.visible : classes.transparent)}
        fit="contain"
        height={size}
        width="auto"
        src="img/primary-logo_condensed.svg"
      />
      <Image
        className={cx(condensed ? classes.transparent : classes.visible)}
        fit="contain"
        height={size}
        width="auto"
        src="img/primary-logo.svg"
      />
    </>
  );
};
