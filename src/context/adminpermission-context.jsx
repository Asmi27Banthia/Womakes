import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
// import { Cookies, useCookies } from "react-cookie";

export const AdminPermissionContext = createContext({});

export const adminPermissionProvider = ({ children }) => {
  const [permissionData, setpermissionData] = useState( [
    { id: 1, name: 'DD', path:'./one'},
    {
      id: 2,
      name: 'Asmi',
      path:'./two'
    },
    {
      id: 3,
      name: 'Heena',
      path:'./three'
    },
    {
      id: 4,
      name: 'Payal',
      path:'./four'
    },
    {
      id: 5,
      name: 'Bansari',
      path:'./five'
    },
  ])
 

  const [editData,setEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        permissionData,
        setpermissionData,
        editData,
        setEditData
    }),
    [permissionData,editData]
  );

  return <AdminPermissionContext.Provider value={contextValues}>{children}</AdminPermissionContext.Provider>;
};

adminPermissionProvider.propTypes = {
  children: PropTypes.any,
};
