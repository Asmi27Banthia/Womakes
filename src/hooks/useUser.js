import { useContext } from 'react';
import { UserContext } from 'src/context';

export const useUser= () => useContext(UserContext);
