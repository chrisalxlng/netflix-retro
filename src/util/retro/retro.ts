import {
  FindMostBingedShowsArguments,
  FindMostWatchedShowsArguments,
  MostActiveMonths,
  MostBingedShow,
  MostWatchedShow,
  Show,
  TotalPlaybacksAndShowsWatched,
} from '@src/types';
import { Dayjs } from 'dayjs';
import { findMostOccuringElementsInArray, uniquifyArray } from '@src/util';

export const getTotalPlaybacksAndShowsWatched = (shows: Show[]): TotalPlaybacksAndShowsWatched => ({
  playbackCount: shows.reduce((count, show) => count + show.dates.length, 0),
  showCount: shows.length,
});

export const findMostWatchedShows = (args: FindMostWatchedShowsArguments): MostWatchedShow[] => {
  const { shows, count } = args;
  const sortedShows = shows.sort(
    (previous, current) => current.dates.length - previous.dates.length
  );
  const formattedShows = sortedShows.map(({ title, dates }) => ({
    title,
    playbackCount: dates.length,
  }));
  if (!count) return formattedShows;
  return formattedShows.slice(0, count);
};

export const findMostActiveMonths = (shows: Show[]): MostActiveMonths => {
  const formattedDates = shows.flatMap((show) => show.dates.map((date) => date.format('MMMM')));
  const { elements, count } = findMostOccuringElementsInArray(formattedDates);

  return { months: elements, playbackCount: count };
};

export const formatMonthListAsString = (months: string[]): string =>
  months
    .map((month, index) => {
      const isLastElementInArray = index + 1 === months.length;
      const isPenultimateElementInArray = index + 2 === months.length;
      if (isLastElementInArray) return month;
      if (isPenultimateElementInArray) return `${month} and `;
      return `${month}, `;
    })
    .join('');

export const findMostBingedShows = (args: FindMostBingedShowsArguments): MostBingedShow[] => {
  const { shows, count } = args;
  const store: {
    title: string;
    dayCount: number;
    playbackCount: number;
    episodesPerDay: number;
  }[] = [];
  shows.forEach((show) => {
    const tempStore: { dates: Dayjs[]; playbackCount: number }[] = [];
    show.dates.forEach((date) => {
      const dateEntry = tempStore.find(
        (entry) =>
          entry.dates.some((d) => d.isSame(date)) ||
          entry.dates.some((d) => d.isSame(date.add(1, 'd'))) ||
          entry.dates.some((d) => d.isSame(date.subtract(1, 'd')))
      );
      if (!dateEntry) tempStore.push({ dates: [date], playbackCount: 1 });
      else if (!dateEntry.dates.some((d) => d.isSame(date))) {
        dateEntry.dates.push(date);
        dateEntry.playbackCount += 1;
      } else dateEntry.playbackCount += 1;
    });
    tempStore.forEach((entry) =>
      store.push({
        title: show.title,
        dayCount: entry.dates.length,
        playbackCount: entry.playbackCount,
        episodesPerDay: entry.playbackCount / entry.dates.length,
      })
    );
  });
  const sortedStore = store.sort(
    (previous, current) => current.episodesPerDay - previous.episodesPerDay
  );
  const uniqueSortedStore = uniquifyArray(sortedStore);
  const mostBingedShows = uniqueSortedStore.map((show) => ({
    title: show.title,
    dayCount: show.dayCount,
    playbackCount: show.playbackCount,
  }));

  return mostBingedShows.slice(0, count);
};
