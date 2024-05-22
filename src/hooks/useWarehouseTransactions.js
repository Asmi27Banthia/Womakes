import { useContext } from 'react';
import { WarehouseTransactionsContext } from 'src/context';

export const useWarehouseTransactions= () => useContext(WarehouseTransactionsContext);
