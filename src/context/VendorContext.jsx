import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const VendorContext = createContext({});

export const VendorProvider = ({ children }) => {
  const [VendorData, setVendorData] = useState( [
    { 
      id: 1,
      name: 'DD', 
      phoneNo:'9898989898',
      countryCode:'067',
      email:'asbc@gmail.com',
      status:'blahone',
      approvedBy:'Asmi Banthia',
      adminUserId:'123'
    },
    {
      id: 2,
      name: 'Asmi',
      phoneNo:'9334343434',
      countryCode:'059',
      email:'asmi27banthia@gmail.com',
      status:'blahtwol',
      approvedBy:'Asmi Banthia',
      adminUserId:'987'
    },
    {
      id: 3,
      name: 'Heena',
      phoneNo:'91919112122',
      countryCode:'712',
      email:'heenamalvi@gmail.com',
      status:'blahthree',
      approvedBy:'Asmi Banthia',
      adminUserId:'444'
    },
    {
      id: 4,
      name: 'Payal',
      phoneNo:'9711341190',
      countryCode:'560',
      email:'payalp@gmail.com',
      status:'blahfour',
      approvedBy:'Asmi Banthia',
      adminUserId:'011'
    },
    {
      id: 5,
      name: 'Bansari',
      phoneNo:'9667678901',
      countryCode:'312',
      email:'bansari@gmail.com',
      status:'blahfive',
      approvedBy:'Asmi Banthia',
      adminUserId:'119'
    },
  ])
 

  const [VendoreditData,VendorsetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        VendorData,
      setVendorData,
      VendoreditData,
      VendorsetEditData
    }),
    [VendorData,VendoreditData]
  );

  return <VendorContext.Provider value={contextValues}>{children}</VendorContext.Provider>;
};

VendorProvider.propTypes = {
  children: PropTypes.any,
};
