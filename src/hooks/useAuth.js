import { useContext } from 'react';
import { AuthContext } from 'src/context';

export const useAuth = () => useContext(AuthContext);
