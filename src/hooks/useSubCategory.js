import { useContext } from 'react';
import { SubCategoryContext } from 'src/context';

export const useSubCategory= () => useContext(SubCategoryContext);
