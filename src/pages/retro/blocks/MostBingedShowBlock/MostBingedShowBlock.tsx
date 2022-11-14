import { RetroBlock } from '@src/core';
import { Show } from '@src/types';
import { findMostBingedShows } from '@src/util';

type MostBingedShowBlockProps = {
  shows: Show[];
};

export const MostBingedShowBlock = ({ shows }: MostBingedShowBlockProps) => {
  const { title, dayCount, playbackCount } = findMostBingedShows(shows);
  const episodes = playbackCount === 1 ? 'episode' : 'episodes';

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
        days.
      </RetroBlock.Heading>
      <RetroBlock.Subheading>Making it the show you binged the hardest.</RetroBlock.Subheading>
    </RetroBlock>
  );
};
