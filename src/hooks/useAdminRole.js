import { useContext } from 'react';
import { AdminRoleContext } from 'src/context';

export const useAdminRole= () => useContext(AdminRoleContext);
