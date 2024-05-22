import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const ProductStockContext = createContext({});

export const ProductStockProvider = ({ children }) => {
  const [ProductStockData, setProductStockData] = useState([
    {
      id: 1,
      Product_Id:'1',
      quantity:'200',
      WareHouseId: '2',
    },
    {
      id: 2,
      Product_Id:'3',
      quantity:'100',
      WareHouseId: '4',
    },
    {
      id: 3,
      Product_Id:'2',
      quantity:'400',
      WareHouseId: '2',
    },
    {
      id: 4,
      Product_Id:'5',
      quantity:'100',
      WareHouseId: '5',
    },
    {
      id: 5,
      Product_Id:'3',
      quantity:'600',
      WareHouseId: '3',
    },
  ]);

  const [ProductStockeditData, ProductStocksetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      ProductStockData,
      setProductStockData,
      ProductStockeditData,
      ProductStocksetEditData,
    }),
    [ProductStockData, setProductStockData, ProductStocksetEditData, ProductStockeditData]
  );

  return (
    <ProductStockContext.Provider value={contextValues}>{children}</ProductStockContext.Provider>
  );
};

ProductStockProvider.propTypes = {
  children: PropTypes.any,
};
