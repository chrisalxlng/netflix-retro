import { RetroBlock } from '@src/core';
import { Show } from '@src/types';
import { getTotalPlaybacksAndShowsWatched } from '@src/util';

type TotalPlaybacksBlockProps = {
  shows: Show[];
  year: number;
};

export const TotalPlaybacksBlock = ({ shows, year }: TotalPlaybacksBlockProps) => {
  const { playbackCount, showCount } = getTotalPlaybacksAndShowsWatched(shows);

  return (
    <RetroBlock>
      <RetroBlock.Heading>
        In {year}, you watched{' '}
        <RetroBlock.Heading accent inline>
          {showCount}
        </RetroBlock.Heading>{' '}
        different shows or movies.
      </RetroBlock.Heading>
      <RetroBlock.Subheading>
        Resulting in{' '}
        <RetroBlock.Subheading accent inline>
          {playbackCount}
        </RetroBlock.Subheading>{' '}
        total playbacks.
      </RetroBlock.Subheading>
    </RetroBlock>
  );
};
