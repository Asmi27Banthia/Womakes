import { useContext } from 'react';
import { LoaderContext } from 'src/context';

export const useLoader = () => useContext(LoaderContext);
