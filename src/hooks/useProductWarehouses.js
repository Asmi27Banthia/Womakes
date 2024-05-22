import { useContext } from 'react';
import { ProductWarehousesContext } from 'src/context';

export const useProductWarehouses= () => useContext(ProductWarehousesContext);
