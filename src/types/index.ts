import { Dayjs } from 'dayjs';

export type RawNetflixCSV = { Title: string; Date: string };
export type FormattedNetflixCSV = { title: string; date: Dayjs };
export type Show = { title: string; dates: Dayjs[] };
export type ShowDateRange = { from: Dayjs; to: Dayjs };
export type ShowDateSpot = { at: Dayjs };
