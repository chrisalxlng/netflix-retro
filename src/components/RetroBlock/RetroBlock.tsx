import { Card, Container, Text } from '@mantine/core';
import { useIntersection, useMediaQuery } from '@mantine/hooks';
import { ReactNode, useEffect, useState } from 'react';
import useStyles from './RetroBlock.styles';

type RetroBlockProps = {
  children: ReactNode[] | ReactNode;
};

type RetroBlockHeadingProps = {
  children: ReactNode[] | ReactNode;
  accent?: boolean;
  inline?: boolean;
  disableAnimation?: boolean;
};

type RetroBlockSubheadingProps = {
  children: ReactNode[] | ReactNode;
  accent?: boolean;
  inline?: boolean;
  disableAnimation?: boolean;
};

type RetroBlockCardProps = {
  children: ReactNode[] | ReactNode;
  className?: string;
};
const INTERSECTION_THRESHOLD = 0.1;

export const RetroBlock = ({ children }: RetroBlockProps) => {
  const { classes } = useStyles();

  return <Container className={classes.container}>{children}</Container>;
};

RetroBlock.Heading = ({
  children,
  accent = false,
  inline = false,
  disableAnimation = false,
}: RetroBlockHeadingProps) => {
  const { classes, cx } = useStyles();
  const { ref, entry } = useIntersection({
    threshold: INTERSECTION_THRESHOLD,
  });
  const [intersected, setIntersected] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    if (entry?.isIntersecting) setIntersected(true);
  }, [entry?.isIntersecting]);

  return (
    <Text
      ref={ref}
      className={cx(classes.heading, {
        [classes.visible]: intersected && !inline && !disableAnimation,
        [classes.transparent]: !intersected && !inline && !disableAnimation,
      })}
      span={inline}
      inherit={inline}
      color={accent ? 'red' : 'dark'}
      size={isSmallScreen ? 35 : 50}
      weight="bolder"
      align="center"
    >
      {children}
    </Text>
  );
};

RetroBlock.Subheading = ({
  children,
  accent = false,
  inline = false,
  disableAnimation = false,
}: RetroBlockSubheadingProps) => {
  const { classes, cx } = useStyles();
  const { ref, entry } = useIntersection({
    threshold: INTERSECTION_THRESHOLD,
  });
  const [intersected, setIntersected] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    if (entry?.isIntersecting) setIntersected(true);
  }, [entry?.isIntersecting]);

  return (
    <Text
      ref={ref}
      className={cx(classes.subheading, {
        [classes.visible]: intersected && !inline && !disableAnimation,
        [classes.transparent]: !intersected && !inline && !disableAnimation,
      })}
      span={inline}
      inherit={inline}
      color={accent ? 'red' : 'dark'}
      size={isSmallScreen ? 25 : 37}
      weight="bold"
      align="center"
    >
      {children}
    </Text>
  );
};

RetroBlock.Card = ({ children, className }: RetroBlockCardProps) => (
  <Card shadow="sm" p="xl" radius="md" className={className}>
    {children}
  </Card>
);
