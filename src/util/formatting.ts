import { FormattedNetflixCSV, RawNetflixCSV, Show, ShowDateRange, ShowDateSpot } from '@src/types';
import dayjs, { Dayjs } from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import IsBetween from 'dayjs/plugin/isBetween';

const formatTitle = (title: string) => {
  const PREFIX = ': ';
  const SEPARATORS_EN = ['Season', 'Chapter', 'Limited Series', 'Part'];
  const SEPARATORS_DE = ['Staffel', 'Kapitel', 'Miniserie', 'Teil'];
  const SEPARATORS_TO_CONSIDER = [...SEPARATORS_EN, ...SEPARATORS_DE];

  let result = '';

  const isContainingSeparator = SEPARATORS_TO_CONSIDER.some((separator) => {
    const term = `${PREFIX}${separator}`;
    [result] = title.split(term);
    return title.includes(term);
  });

  if (!isContainingSeparator) return title.split(':')[0];

  return result;
};

export const formatNetflixCSV = (csv: RawNetflixCSV[]): FormattedNetflixCSV[] => {
  dayjs.extend(CustomParseFormat);
  return csv.map((item) => ({
    title: formatTitle(item.Title.replaceAll('"', '')),
    date: dayjs(item.Date.replaceAll('"', ''), 'DD/MM/YYYY'),
  }));
};

export const groupNetflixCSVByTitle = (list: FormattedNetflixCSV[]): Show[] =>
  list.reduce((previous: Show[], current) => {
    if (!previous.some((item) => item.title === current.title)) {
      previous.push({ title: current.title, dates: [current.date] });
    } else {
      previous.find((item) => item.title === current.title)?.dates.push(current.date);
    }
    return previous;
  }, []);

export const createDate = (query: string): Dayjs => {
  dayjs.extend(CustomParseFormat);
  return dayjs(query, 'MM-YYYY');
};

export const getShowsByDate = (shows: Show[], date: ShowDateRange | ShowDateSpot) => {
  const getShows = (from: Dayjs, to: Dayjs) => {
    dayjs.extend(IsBetween);
    return shows
      .map((show) => ({
        ...show,
        dates: show.dates.filter((showDate) => showDate.isBetween(from, to)),
      }))
      .filter((show) => show.dates.length);
  };
  if ('at' in date) {
    return getShows(date.at, date.at.add(1, 'M'));
  }
  if ('from' in date && 'to' in date) {
    return getShows(date.from, date.to.add(1, 'M'));
  }
  return [];
};
