import { useContext } from 'react';
import { WarehouseContext } from 'src/context';

export const useWarehouse= () => useContext(WarehouseContext);
