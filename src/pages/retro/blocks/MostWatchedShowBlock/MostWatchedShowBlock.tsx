import { RetroBlock } from '@src/core';
import { Show } from '@src/types';
import { findMostWatchedShows } from '@src/util';

type MostWatchedShowBlockProps = {
  shows: Show[];
  year: number;
};

export const MostWatchedShowBlock = ({ shows, year }: MostWatchedShowBlockProps) => {
  const [mostWatchedShow] = findMostWatchedShows(shows, 1);
  const mostWatchedShowTitle = mostWatchedShow?.title;
  const playbackCount = mostWatchedShow?.playbackCount;
  const episodes = playbackCount === 1 ? 'episode' : 'episodes';

  return (
    <RetroBlock>
      <RetroBlock.Heading>
        You watched{' '}
        <RetroBlock.Heading accent inline>
          {playbackCount}
        </RetroBlock.Heading>{' '}
        {episodes} of{' '}
        <RetroBlock.Heading accent inline>
          {mostWatchedShowTitle}
        </RetroBlock.Heading>
        .
      </RetroBlock.Heading>
      <RetroBlock.Subheading>
        Giving it the title of your most watched show in {year}.
      </RetroBlock.Subheading>
    </RetroBlock>
  );
};
