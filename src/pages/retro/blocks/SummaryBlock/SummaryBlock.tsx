import { Button, Group, Space, Text } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { Logo, RetroBlock } from '@src/core';
import { Show } from '@src/types';
import {
  findMostBingedShows,
  findMostWatchedShows,
  getTotalPlaybacksAndShowsWatched,
  downloadImage,
  shareFiles,
  generateImageFileFromURL,
  generateImageURLFromComponent,
} from '@src/util';
import { IconDownload, IconShare } from '@tabler/icons';
import { useRef, useState } from 'react';
import useStyles from './SummaryBlock.styles';

type SummaryBlockProps = {
  shows: Show[];
  year: number;
};

type RetroCardProps = {
  shows: Show[];
  year: number;
};

const PAGE_URL = 'https://netflixretro.vercel.app';

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
      <Group position="right" spacing={5}>
        <Text color="white" inline size="xs" pb={5}>
          provided by
        </Text>
        <Logo size={20} />
      </Group>
      <Space h={5} />
      <Group position="right" spacing="xs">
        <Text color="white" inline size="xs">
          Get your own at:{' '}
          <Text span inherit color="red">
            {PAGE_URL}
          </Text>
        </Text>
      </Group>
    </RetroBlock.Card>
  );
};

export const SummaryBlock = ({ shows, year }: SummaryBlockProps) => {
  const retroCardRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const imageURL = await generateImageURLFromComponent(retroCardRef);
            const imageFile = await generateImageFileFromURL(imageURL, `netflix-retro-${year}.jpg`);
            try {
              shareFiles({
                files: [imageFile],
              });
            } catch (error) {
              downloadImage(imageURL, `netflix-retro-${year}.jpg`);
            }
            setLoading(false);
          }}
          loading={loading}
        >
          Share summary
        </Button>
      ) : (
        <Button
          leftIcon={<IconDownload size={14} />}
          onClick={async () => {
            setLoading(true);
            const imageURL = await generateImageURLFromComponent(retroCardRef);
            downloadImage(imageURL, `netflix-retro-${year}.jpg`);
            setLoading(false);
          }}
          loading={loading}
        >
          Download summary
        </Button>
      )}
    </RetroBlock>
  );
};
