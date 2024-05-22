import { useContext } from 'react';
import { AdminUserContext } from 'src/context';

export const useAdminUser= () => useContext(AdminUserContext);
