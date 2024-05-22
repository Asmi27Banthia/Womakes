import { useContext } from 'react';
import { OfferCategoryContext } from 'src/context';

export const useOfferCategory= () => useContext(OfferCategoryContext);
