import { useContext } from 'react';
import { OffersContext } from 'src/context';

export const useOffers= () => useContext(OffersContext);
