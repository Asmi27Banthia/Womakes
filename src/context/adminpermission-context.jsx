import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
// import { Cookies, useCookies } from "react-cookie";

export const AdminPermissionContext = createContext({});

export const adminPermissionProvider = ({ children }) => {
  const [permissionData, setpermissionData] = useState( [
    { id: 1, name: 'DD', age: '25', joinDate: '2030-02-17', role: 'Admin', email: 'abc@gmail.com' },
    {
      id: 2,
      name: 'Asmi',
      age: '21',
      joinDate: '2031-06-01',
      role: 'Developer',
      email: 'bcd@gmail.com',
    },
    {
      id: 3,
      name: 'Heena',
      age: '20',
      joinDate: '2035-04-02',
      role: 'Tester',
      email: 'def@gmail.com',
    },
    {
      id: 4,
      name: 'Payal',
      age: '40',
      joinDate: '2031-09-09',
      role: 'Developer',
      email: 'bcd@gmail.com',
    },
    {
      id: 5,
      name: 'Bansari',
      age: '30',
      joinDate: '2035-08-14',
      role: 'Tester',
      email: 'def@gmail.com',
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
