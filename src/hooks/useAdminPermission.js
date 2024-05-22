import { useContext } from 'react';
import { AdminPermissionContext } from 'src/context';

export const useAdminPermission = () => useContext(AdminPermissionContext);
