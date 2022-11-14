import { ShowContext } from '@src/contexts';
import { useContext } from 'react';

export const useShow = () => useContext(ShowContext);
