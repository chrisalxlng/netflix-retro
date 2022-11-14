import { Button, Group, Space, Text } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { Logo, RetroBlock } from '@src/core';
import { Show } from '@src/types';
import {
  findMostBingedShows,
  findMostWatchedShows,
  getTotalPlaybacksAndShowsWatched,
  generateImageFromComponent,
  downloadImage,
  shareURL,
} from '@src/util';
import { IconDownload, IconShare } from '@tabler/icons';
import { useRef } from 'react';
import useStyles from './SummaryBlock.styles';

type SummaryBlockProps = {
  shows: Show[];
  year: number;
};

type RetroCardProps = {
  shows: Show[];
  year: number;
};

const RetroCard = ({ shows, year }: RetroCardProps) => {
  const { classes } = useStyles();
  const mostWatchedShows = findMostWatchedShows(shows, 5);
  const { playbackCount, showCount } = getTotalPlaybacksAndShowsWatched(shows);
  const { title } = findMostBingedShows(shows);

  return (
    <RetroBlock.Card className={classes.card}>
      <Text size={22} weight="bolder" color="white">
        Netflix Retrospective{' '}
        <Text span inherit color="red">
          {year}
        </Text>
      </Text>
      <Space h="xl" />
      <Text weight="bold" color="white">
        Most Watched:
      </Text>
      {mostWatchedShows.map((show, index) => (
        <Text key={show.title} weight="bold" color="white">
          {index + 1}.{' '}
          <Text span inherit color="red">
            {show.title}
          </Text>
        </Text>
      ))}
      <Space h="md" />
      <Text weight="bold" color="white">
        Total Playbacks:{' '}
        <Text span inherit color="red">
          {playbackCount}
        </Text>
      </Text>
      <Text weight="bold" color="white">
        Total Watched Shows & Movies:{' '}
        <Text span inherit color="red">
          {showCount}
        </Text>
      </Text>
      <Text weight="bold" color="white">
        Most Binged:{' '}
        <Text span inherit color="red">
          {title}
        </Text>
      </Text>
      <Space h="xl" />
      <Group position="right" spacing="xs">
        <Text color="white" inline size="xs">
          provided by
        </Text>
        <Logo size={20} />
      </Group>
    </RetroBlock.Card>
  );
};

export const SummaryBlock = ({ shows, year }: SummaryBlockProps) => {
  const retroCardRef = useRef(null);

  const os = useOs();
  const isMobileDevice = os === 'android' || os === 'ios';

  return (
    <RetroBlock>
      <RetroBlock.Heading disableAnimation>
        Your summary for the year{' '}
        <RetroBlock.Heading accent inline>
          {year}
        </RetroBlock.Heading>
      </RetroBlock.Heading>
      <div ref={retroCardRef}>
        <RetroCard shows={shows} year={year} />
      </div>
      {isMobileDevice ? (
        <Button
          leftIcon={<IconShare size={14} />}
          onClick={async () => {
            const imageURL = await generateImageFromComponent(retroCardRef);
            shareURL({
              title: `My Nextflix Retrospective ${year}`,
              text: `See which shows you have watched the most on Netflix in ${year}!`,
              url: imageURL,
            });
          }}
        >
          Share summary
        </Button>
      ) : (
        <Button
          leftIcon={<IconDownload size={14} />}
          onClick={async () => {
            const imageURL = await generateImageFromComponent(retroCardRef);
            downloadImage(imageURL, `netflix-retro-${year}.jpg`);
          }}
        >
          Download summary
        </Button>
      )}
    </RetroBlock>
  );
};
