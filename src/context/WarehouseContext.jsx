import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
// import { Cookies, useCookies } from "react-cookie";

export const WarehouseContext = createContext({});

export const WarehouseProvider = ({ children }) => {
  const [WarehouseData, setWarehouseData] = useState( [
    { id: 1, name: 'DD', city:'Junagadh',location: 'abc',address:'123 Main Street, Springfield, USA', pincode:'380022',createdBy:'Asmi Banthia',
    approvedBy:'Asmi Banthia' },
    {
      id: 2,
      name: 'Asmi',
      city:'Ahmedabad',
      location: 'abcd', 
      address:'456 Elm Avenue, Lakeside, Canada',
      pincode:'380021',
      createdBy:'Asmi Banthia',
      approvedBy:'Asmi Banthia'
    },
    {
      id: 3,
      name: 'Heena',
      city:'Mumbai',
      location: 'ab', 
      address:'789 Oak Lane, Green Hills, UK',
      pincode:'380014',
      createdBy:'Asmi Banthia',
      approvedBy:'Asmi Banthia'
    },
    {
      id: 4,
      name: 'Payal',
      city:'Amritsar',
      location: 'abcde', 
      address:'321 Maple Court, Riverdale, Australia',
      pincode:'380012',
      createdBy:'Asmi Banthia',
      approvedBy:'Asmi Banthia'
    },
    {
      id: 5,
      name: 'Bansari',
      city:'Surat',
      location: 'abcd', 
      address:'987 Pine Road, Mountain View, New Zealand',
      pincode:'380004',
      createdBy:'Asmi Banthia',
      approvedBy:'Asmi Banthia'
    },
  ])
 

  const [WarehouseeditData,WarehousesetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
      WarehouseData,
      setWarehouseData,
      WarehouseeditData,
      WarehousesetEditData
    }),
    [WarehouseData,WarehouseeditData]
  );

  return <WarehouseContext.Provider value={contextValues}>{children}</WarehouseContext.Provider>;
};

WarehouseProvider.propTypes = {
  children: PropTypes.any,
};
