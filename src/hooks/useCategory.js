import { useContext } from 'react';
import { CategoryContext } from 'src/context';

export const useCategory= () => useContext(CategoryContext);
