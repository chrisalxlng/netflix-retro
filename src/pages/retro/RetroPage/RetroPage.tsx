import { useShow } from '@src/hooks';
import { createDate, getShowsByDate } from '@src/util';
import { useMemo } from 'react';
import {
  MostActiveMonthBlock,
  MostBingedShowBlock,
  MostWatchedShowBlock,
  SummaryBlock,
  TotalPlaybacksBlock,
  MissingDataPage,
} from '@src/pages';
import { PageLayout } from '@src/layouts';
import useStyles from './RetroPage.styles';

export const RetroPage = () => {
  const { shows, latestRetroYear } = useShow();
  const { classes } = useStyles();

  const filteredShows = useMemo(
    () =>
      getShowsByDate(shows, {
        from: createDate(`01-${latestRetroYear}`),
        to: createDate(`12-${latestRetroYear}`),
      }),
    [shows]
  );

  if (!shows.length) return <MissingDataPage />;

  return (
    <PageLayout>
      <div className={classes.container}>
        <TotalPlaybacksBlock shows={filteredShows} year={latestRetroYear} />
        <MostActiveMonthBlock shows={filteredShows} year={latestRetroYear} />
        <MostBingedShowBlock shows={filteredShows} />
        <MostWatchedShowBlock shows={filteredShows} year={latestRetroYear} />
        <SummaryBlock shows={filteredShows} year={latestRetroYear} />
      </div>
    </PageLayout>
  );
};
