import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const AdminUserContext = createContext({});

export const AdminUserProvider = ({ children }) => {
  const [AdminUserData, setAdminUserData] = useState( [
    { id: 1, name: 'DD', role: 'Admin', email: 'abc@gmail.com' },
    {
      id: 2,
      name: 'Asmi',
      role: 'Developer',
      email: 'bcd@gmail.com',
    },
    {
      id: 3,
      name: 'Heena',
      role: 'Tester',
      email: 'def@gmail.com',
    },
    {
      id: 4,
      name: 'Payal',
      role: 'Developer',
      email: 'bcd@gmail.com',
    },
    {
      id: 5,
      name: 'Bansari',
      role: 'Tester',
      email: 'def@gmail.com',
    },
  ])
 

  const [AdminUsereditData,AdminUsersetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        AdminUserData,
        setAdminUserData,
        AdminUsereditData,
        AdminUsersetEditData
    }),
    [AdminUserData,AdminUsereditData]
  );

  return <AdminUserContext.Provider value={contextValues}>{children}</AdminUserContext.Provider>;
};

AdminUserProvider.propTypes = {
  children: PropTypes.any,
};
