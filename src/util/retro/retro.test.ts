import {
  FindMostBingedShowsArguments,
  FindMostWatchedShowsArguments,
  MostActiveMonths,
  MostBingedShow,
  MostWatchedShow,
  Show,
  TotalPlaybacksAndShowsWatched,
} from '@src/types';
import {
  getTotalPlaybacksAndShowsWatched,
  findMostWatchedShows,
  findMostActiveMonths,
  formatMonthListAsString,
  findMostBingedShows,
} from '@src/util';
import dayjs from 'dayjs';

const SHOWS_W_EMPTY_DATES_ARRAY = [{ title: 'Show 1', dates: [] }];
const SHOWS_W_COMMON_INPUT = [
  { title: 'Show 1', dates: [dayjs('03-05-22'), dayjs('04-28-22')] },
  { title: 'Show 2', dates: [dayjs('02-21-22'), dayjs('04-27-22'), dayjs('11-01-22')] },
];
const SHOWS_W_MONTHS_EQUAL_PLAYBACKS = [
  { title: 'Show 1', dates: [dayjs('02-05-22'), dayjs('04-28-22')] },
  { title: 'Show 2', dates: [dayjs('02-21-22'), dayjs('04-27-22'), dayjs('11-01-22')] },
];
const SHOWS_W_DATES_CLOSE_BY = [
  { title: 'Show 1', dates: [dayjs('02-25-22'), dayjs('02-25-22'), dayjs('02-26-22')] },
  {
    title: 'Show 2',
    dates: [
      dayjs('02-21-22'),
      dayjs('04-27-22'),
      dayjs('07-16-22'),
      dayjs('07-24-22'),
      dayjs('11-01-22'),
    ],
  },
];

describe('retro util function', () => {
  it('gives the correct response of totalPlaybacksAndShowsWatched with empty array', () => {
    const data: Show[] = [];
    const result: TotalPlaybacksAndShowsWatched = { playbackCount: 0, showCount: 0 };

    expect(getTotalPlaybacksAndShowsWatched(data)).toEqual(result);
  });

  it('gives the correct response of totalPlaybacksAndShowsWatched with empty dates array', () => {
    const data: Show[] = SHOWS_W_EMPTY_DATES_ARRAY;
    const result: TotalPlaybacksAndShowsWatched = { playbackCount: 0, showCount: 1 };

    expect(getTotalPlaybacksAndShowsWatched(data)).toEqual(result);
  });

  it('gives the correct response of totalPlaybacksAndShowsWatched with common input', () => {
    const data: Show[] = SHOWS_W_COMMON_INPUT;
    const result: TotalPlaybacksAndShowsWatched = { playbackCount: 5, showCount: 2 };

    expect(getTotalPlaybacksAndShowsWatched(data)).toEqual(result);
  });

  it('gives the correct response of mostWatchedShows with empty shows array', () => {
    const data: FindMostWatchedShowsArguments = { shows: [] };
    const result: MostWatchedShow[] = [];

    expect(findMostWatchedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostWatchedShows with empty dates array', () => {
    const data: FindMostWatchedShowsArguments = { shows: SHOWS_W_EMPTY_DATES_ARRAY };
    const result: MostWatchedShow[] = [{ title: 'Show 1', playbackCount: 0 }];

    expect(findMostWatchedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostWatchedShows with common input', () => {
    const data: FindMostWatchedShowsArguments = { shows: SHOWS_W_COMMON_INPUT };
    const result: MostWatchedShow[] = [
      { title: 'Show 2', playbackCount: 3 },
      { title: 'Show 1', playbackCount: 2 },
    ];

    expect(findMostWatchedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostWatchedShows with count as argument', () => {
    const data: FindMostWatchedShowsArguments = { shows: SHOWS_W_COMMON_INPUT, count: 1 };
    const result: MostWatchedShow[] = [{ title: 'Show 2', playbackCount: 3 }];

    expect(findMostWatchedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostActiveMonths with empty shows array', () => {
    const data: Show[] = [];
    const result: MostActiveMonths = { months: [], playbackCount: 0 };

    expect(findMostActiveMonths(data)).toEqual(result);
  });

  it('gives the correct response of mostActiveMonths with empty dates array', () => {
    const data: Show[] = SHOWS_W_EMPTY_DATES_ARRAY;
    const result: MostActiveMonths = { months: [], playbackCount: 0 };

    expect(findMostActiveMonths(data)).toEqual(result);
  });

  it('gives the correct response of mostActiveMonths with common input', () => {
    const data: Show[] = SHOWS_W_COMMON_INPUT;
    const result: MostActiveMonths = { months: ['April'], playbackCount: 2 };

    expect(findMostActiveMonths(data)).toEqual(result);
  });

  it('gives the correct response of mostActiveMonths with equal playbacks of months', () => {
    const data: Show[] = SHOWS_W_MONTHS_EQUAL_PLAYBACKS;
    const result: MostActiveMonths = { months: ['February', 'April'], playbackCount: 2 };

    expect(findMostActiveMonths(data)).toEqual(result);
  });

  it('formats months correctly with an empty months array', () => {
    const data: string[] = [];
    const result: string = '';

    expect(formatMonthListAsString(data)).toBe(result);
  });

  it('formats months correctly with a single month as input', () => {
    const data: string[] = ['January'];
    const result: string = 'January';

    expect(formatMonthListAsString(data)).toBe(result);
  });

  it('formats months correctly with a multiple months as input', () => {
    const data: string[] = ['January', 'April', 'June'];
    const result: string = 'January, April and June';

    expect(formatMonthListAsString(data)).toBe(result);
  });

  it('gives the correct response of mostBingedShow with empty shows array', () => {
    const data: FindMostBingedShowsArguments = { shows: [] };
    const result: MostBingedShow[] = [];

    expect(findMostBingedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostBingedShow with empty dates array', () => {
    const data: FindMostBingedShowsArguments = { shows: SHOWS_W_EMPTY_DATES_ARRAY };
    const result: MostBingedShow[] = [];

    expect(findMostBingedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostBingedShow with common input', () => {
    const data: FindMostBingedShowsArguments = { shows: SHOWS_W_DATES_CLOSE_BY };
    const result: MostBingedShow[] = [
      { title: 'Show 1', playbackCount: 3, dayCount: 2 },
      { title: 'Show 2', playbackCount: 1, dayCount: 1 },
    ];

    expect(findMostBingedShows(data)).toEqual(result);
  });

  it('gives the correct response of mostBingedShow with count as argument', () => {
    const data: FindMostBingedShowsArguments = { shows: SHOWS_W_DATES_CLOSE_BY, count: 1 };
    const result: MostBingedShow[] = [{ title: 'Show 1', playbackCount: 3, dayCount: 2 }];

    expect(findMostBingedShows(data)).toEqual(result);
  });
});
