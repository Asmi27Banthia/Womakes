import { useContext } from 'react';
import { OrderContext } from 'src/context';

export const useOrder= () => useContext(OrderContext);
