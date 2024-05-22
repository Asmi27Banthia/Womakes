import { useContext } from 'react';
import { ProductContext } from 'src/context';

export const useProduct= () => useContext(ProductContext);
