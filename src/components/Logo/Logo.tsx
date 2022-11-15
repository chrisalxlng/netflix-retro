import PrimaryLogo from 'public/assets/primary-logo.svg';
import PrimaryLogoCondensed from 'public/assets/primary-logo_condensed.svg';
import useStyles from './Logo.styles';

type LogoProps = {
  condensed?: boolean;
  size?: number;
  enableAnimation?: boolean;
};

export const Logo = ({ condensed = false, size = 35, enableAnimation = false }: LogoProps) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <div
        className={cx({
          [classes.hidden]: !condensed && !enableAnimation,
          [classes.visible]: condensed && enableAnimation,
          [classes.transparent]: !condensed && enableAnimation,
        })}
      >
        <PrimaryLogoCondensed width={size} height={size} viewBox="0 0 100 100" />
      </div>
      <div
        className={cx({
          [classes.hidden]: condensed && !enableAnimation,
          [classes.visible]: !condensed && enableAnimation,
          [classes.transparent]: condensed && enableAnimation,
        })}
      >
        <PrimaryLogo width={size * 4.6} height={size} viewBox={`0 0 ${360 + size * 3} 100`} />
      </div>
    </>
  );
};
