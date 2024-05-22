import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const ProductWarehousesContext = createContext({});

export const ProductWarehousesProvider = ({ children }) => {
  const [ProductWarehousesData, setProductWarehouses] = useState( [
    { 
      id: 1,
     Product_Id:'3',
     WareHouseId:'1'
    },
    {
      id: 2,
      Product_Id:'3',
     WareHouseId:'1'
    },
    {
      id: 3,
      Product_Id:'3',
     WareHouseId:'1'
    },
    {
      id: 4,
      Product_Id:'3',
     WareHouseId:'1'
    },
    {
      id: 5,
      Product_Id:'3',
     WareHouseId:'1'
    },
  ])
 

  const [ProductWarehouseseditData,ProductWarehousessetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        ProductWarehousesData,
        setProductWarehouses,
      ProductWarehouseseditData,
      ProductWarehousessetEditData
    }),
    [ProductWarehousesData,ProductWarehouseseditData,setProductWarehouses,ProductWarehousessetEditData]
  );

  return <ProductWarehousesContext.Provider value={contextValues}>{children}</ProductWarehousesContext.Provider>;
};

ProductWarehousesProvider.propTypes = {
  children: PropTypes.any,
};
