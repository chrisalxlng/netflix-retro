import { RetroBlock } from '@src/core';
import { Show } from '@src/types';
import { findMostBingedShows } from '@src/util';

type MostBingedShowBlockProps = {
  shows: Show[];
  year: number;
};

export const MostBingedShowBlock = ({ shows, year }: MostBingedShowBlockProps) => {
  const { title, dayCount, playbackCount } = findMostBingedShows(shows);
  const episodes = playbackCount === 1 ? 'episode' : 'episodes';
  const days = dayCount === 1 ? 'day' : 'days';

  return (
    <RetroBlock>
      <RetroBlock.Heading>
        You watched{' '}
        <RetroBlock.Heading accent inline>
          {playbackCount}
        </RetroBlock.Heading>{' '}
        {episodes} of
        <RetroBlock.Heading accent inline>
          {' '}
          {title}
        </RetroBlock.Heading>{' '}
        in
        <RetroBlock.Heading accent inline>
          {' '}
          {dayCount}
        </RetroBlock.Heading>{' '}
        {days}.
      </RetroBlock.Heading>
      <RetroBlock.Subheading>
        Therefore, it is the show you binged the hardest in {year}.
      </RetroBlock.Subheading>
    </RetroBlock>
  );
};
