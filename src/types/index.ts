import { Dayjs } from 'dayjs';

export type RawNetflixCSV = { Title: string; Date: string };
export type FormattedNetflixCSV = { title: string; date: Dayjs };
export type Show = { title: string; dates: Dayjs[] };
export type ShowDateRange = { from: Dayjs; to: Dayjs };
export type ShowDateSpot = { at: Dayjs };

export type TotalPlaybacksAndShowsWatched = { playbackCount: number; showCount: number };
export type FindMostWatchedShowsArguments = { shows: Show[]; count?: number };
export type MostWatchedShow = { title: string; playbackCount: number };
export type MostActiveMonths = { months: string[]; playbackCount: number };
export type MostBingedShow = { title: string; dayCount: number; playbackCount: number };
export type FindMostBingedShowsArguments = { shows: Show[]; count?: number };
