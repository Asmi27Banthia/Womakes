import { useContext } from 'react';
import { AddressContext } from 'src/context';

export const useAddress= () => useContext(AddressContext);
