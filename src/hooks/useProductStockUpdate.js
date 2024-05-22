import { useContext } from 'react';
import { ProductStockUpdateContext } from 'src/context';

export const useProductStockUpdate= () => useContext(ProductStockUpdateContext);
