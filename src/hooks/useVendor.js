import { useContext } from 'react';
import { VendorContext } from 'src/context';

export const useVendor= () => useContext(VendorContext);
