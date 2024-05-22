import { useContext } from 'react';
import { ProductStockContext } from 'src/context';

export const useProductStock= () => useContext(ProductStockContext);
