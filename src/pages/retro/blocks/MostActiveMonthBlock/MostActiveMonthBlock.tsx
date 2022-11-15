import { RetroBlock } from '@src/core';
import { Show } from '@src/types';
import { findMostActiveMonths } from '@src/util';

type MostActiveMonthBlockProps = {
  shows: Show[];
  year: number;
};

export const MostActiveMonthBlock = ({ shows, year }: MostActiveMonthBlockProps) => {
  const { months, playbackCount } = findMostActiveMonths(shows);
  const playbacks = playbackCount === 1 ? 'episode or movie' : 'episodes or movies';

  return (
    <RetroBlock>
      <RetroBlock.Heading>
        In{' '}
        <RetroBlock.Heading accent inline>
          {months}
        </RetroBlock.Heading>
        , you watched{' '}
        <RetroBlock.Heading accent inline>
          {playbackCount}
        </RetroBlock.Heading>{' '}
        {playbacks}.
      </RetroBlock.Heading>
      <RetroBlock.Subheading>
        Making it the {months.length === 1 ? 'month' : 'months'} in {year} where you spent the most
        time on Netflix.
      </RetroBlock.Subheading>
    </RetroBlock>
  );
};
