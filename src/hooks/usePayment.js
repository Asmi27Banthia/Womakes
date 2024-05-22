import { useContext } from 'react';
import { PaymentContext } from 'src/context';

export const usePayment= () => useContext(PaymentContext);
