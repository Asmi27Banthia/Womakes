import { useContext } from 'react';
import { ProductStockRequestContext } from 'src/context';

export const useProductStockRequest= () => useContext(ProductStockRequestContext);
