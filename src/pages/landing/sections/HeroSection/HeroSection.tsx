import { useRouter } from 'next/router';
import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import { useShow } from '@src/hooks';
import { RawNetflixCSV } from '@src/types';
import { fetchAndParseCSV, formatNetflixCSV, groupNetflixCSVByTitle } from '@src/util';
import { IconBuildingCircus, IconPlayerPlay } from '@tabler/icons';
import useStyles from './HeroSection.styles';

type HeroSectionProps = {
  scrollToGetStartedTarget: () => void;
};

export const HeroSection = ({ scrollToGetStartedTarget }: HeroSectionProps) => {
  const { classes, cx } = useStyles();
  const { setShows, latestRetroYear } = useShow();
  const { push } = useRouter();

  const handleSeeExample = async () => {
    const csv = await fetchAndParseCSV<RawNetflixCSV>('data/NetflixViewingHistoryExample.csv');
    const formattedData = formatNetflixCSV(csv);
    const shows = groupNetflixCSVByTitle(formattedData);
    await push('/retro');
    setShows(shows, true);
  };

  return (
    <div className={classes.hero}>
      <Overlay color="#000" opacity={0.6} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          A{' '}
          <Text component="span" inherit className={classes.highlight}>
            Netflix Retrospective
          </Text>{' '}
          for the year of {latestRetroYear}
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Relive your past year on Netflix and get some insights into your watching habits.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="gradient"
            gradient={{ from: '#E50914', to: 'red' }}
            size="lg"
            leftIcon={<IconPlayerPlay size={14} />}
            onClick={scrollToGetStartedTarget}
          >
            Get started
          </Button>

          <div className={classes.separator}>
            <Text>or</Text>
          </div>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            variant="subtle"
            size="lg"
            leftIcon={<IconBuildingCircus size={14} />}
            onClick={handleSeeExample}
          >
            See an example
          </Button>
        </div>
      </div>
    </div>
  );
};
