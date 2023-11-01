import { useLocalStorage } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/LoadingScreen/LoadingScreen';
import { Show } from '@src/types';
import dayjs from 'dayjs';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

type ShowProviderProps = {
  children: ReactNode | ReactNode[];
};

type ShowProviderValue = {
  shows: Show[];
  latestRetroYear: number;
  setShows: (shows: Show[], areShowsExample?: boolean) => void;
};

export const ShowContext = createContext<ShowProviderValue>({
  shows: [],
  latestRetroYear: 0,
  setShows: () => null,
});

export const ShowProvider = ({ children }: ShowProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isExample, setIsExample] = useState(false);
  const [shows, setStoragedShows] = useLocalStorage<Show[]>({
    key: 'netflix-shows',
    defaultValue: [],
    deserialize: (localStorageValue: string) => {
      const parsedShows: Show[] = JSON.parse(localStorageValue);
      return parsedShows.map((show) => ({ ...show, dates: show.dates.map((date) => dayjs(date)) }));
    },
  });

  const getLatestRetroYear = () => {
    if (isExample) return 2022;

    const mayOfCurrentYear = dayjs().month(4);
    const isAfterMay = dayjs().isAfter(mayOfCurrentYear, 'month');
    const currentYear = dayjs().year();
    const lastYear = dayjs().subtract(1, 'year').year();
    const currentShowYear = isAfterMay ? currentYear : lastYear;
    return currentShowYear;
  };

  const setShows = (updatedShows: Show[], areShowsExample: boolean = false) => {
    setIsExample(areShowsExample);
    setLoading(true);
    setStoragedShows(updatedShows);
  };

  const latestRetroYear = getLatestRetroYear();

  useEffect(() => {
    setLoading(false);
  }, [shows]);

  const value: ShowProviderValue = useMemo(
    () => ({
      shows,
      latestRetroYear,
      setShows,
    }),
    [shows]
  );

  return (
    <ShowContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </ShowContext.Provider>
  );
};
