import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const AdminRoleContext = createContext({});

export const AdminRoleProvider = ({ children }) => {
  const [AdminRoleData, setAdminRoleData] = useState( [
    { 
      id: 1,
      Role_name: 'DD', 
    },
    {
      id: 2,
      Role_name: 'Asmi',
    },
    {
      id: 3,
      Role_name: 'Heena',
    },
    {
      id: 4,
      Role_name: 'Payal',
    },
    {
      id: 5,
      Role_name: 'Bansari',
    },
  ])
 

  const [AdminRoleeditData,AdminRolesetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        AdminRoleData,
        setAdminRoleData,
        AdminRoleeditData,
        AdminRolesetEditData
    }),
    [AdminRoleData,AdminRoleeditData]
  );

  return <AdminRoleContext.Provider value={contextValues}>{children}</AdminRoleContext.Provider>;
};

AdminRoleProvider.propTypes = {
  children: PropTypes.any,
};
