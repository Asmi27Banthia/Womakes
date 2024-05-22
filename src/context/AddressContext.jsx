import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AddressContext = createContext({});

export const AddressProvider = ({ children }) => {
  const [AddressData, setAddressData] = useState( [
    {
        id: 1,
        lat:' 40.7128',
        long:'-74.0060',
        streetAddress1:' 456 Park Avenue',
        streetAddress2:'123 Main Street',
        pincode:'10001',
        country:'United States',
        state:'California',
        city:'Beverly Hills',
        user_Id:'4',
        type:'Warehouse',
        isWarehouse:'True'
      },
    {
      id: 2,
      lat:'-33.8688',
      long:'151.2093',
      streetAddress1:'789 Green Street',
      streetAddress2:'1234 Oak Street',
      pincode:'90210',
      country:'United States',
      state:'California',
      city:'San Francisco',
      user_Id:'1',
      type:'Warehouse',
      isWarehouse:'True'
    },
    {
      id: 3,
      lat:'51.5074',
      long:'-0.1278',
      streetAddress1:'101 Maple Lane',
      streetAddress2:'456 Elm Avenue',
      pincode:'2000',
      country:'Australia',
      state:'New South Wales',
      city:'Sydney',
      user_Id:'1',
      type:'User',
      isWarehouse:'False'
    },
    {
      id: 4,
      lat:' 35.6895',
      long:'139.6917',
      streetAddress1:'555 Oxford Street',
      streetAddress2:'789 Oak Road',
      pincode:'67890',
      country:'United Kingdom',
      state:'England',
      city:'London',
      user_Id:'3',
      type:'User',
      isWarehouse:'False'
    },
    {
      id: 5,
      lat:'-22.9068',
      long:'-43.1729',
      streetAddress1:'555 Pine Street',
      streetAddress2:'555 Oxford Street',
      pincode:'400001',
      country:'India',
      state:'Maharashtra',
      city:'Mumbai',
      user_Id:'2',
      type:'Warehouse',
      isWarehouse:'True'
    },
  ])
 

  const [AddresseditData,AddresssetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
      AddressData,
      setAddressData,
      AddresseditData,
      AddresssetEditData
    }),
    [AddressData,AddresseditData,setAddressData,AddresssetEditData]
  );

  return <AddressContext.Provider value={contextValues}>{children}</AddressContext.Provider>;
};

AddressProvider.propTypes = {
  children: PropTypes.any,
};
