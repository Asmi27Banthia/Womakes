import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const ProductStockRequestContext = createContext({});

export const ProductStockRequestProvider = ({ children }) => {
  const [ProductStockRequestData, setProductStockRequestData] = useState([
    {
      id: 1,
      Product_Id: '2',
      Stock_Id:'3',
      addedQty:'34',
      totalQty:'50',
      minusQty:'12',
      addedBy:'qwertg',
      approvedBy:'Asmi Banthia',
      WareHouseId: '2',
    },
    {
      id: 2,
      Product_Id: '4',
      Stock_Id:'2',
      addedQty:'12',
      totalQty:'40',
      minusQty:'10',
      addedBy:'qwertg',
      approvedBy:'Asmi Banthia',
      WareHouseId: '5',
    },
    {
      id: 3,
      Product_Id: '1',
      Stock_Id:'1',
      addedQty:'24',
      totalQty:'60',
      minusQty:'9',
      addedBy:'qwertg',
      approvedBy:'Asmi Banthia',
      WareHouseId: '3',
    },
    {
      id: 4,
      Product_Id: '5',
      Stock_Id:'3',
      addedQty:'44',
      totalQty:'80',
      minusQty:'20',
      addedBy:'qwertg',
      approvedBy:'Asmi Banthia',
      WareHouseId: '2',
    },
    {
      id: 5,
      Product_Id: '3',
      Stock_Id:'1',
      addedQty:'10',
      totalQty:'55',
      minusQty:'5',
      addedBy:'qwertg',
      approvedBy:'Asmi Banthia',
      WareHouseId: '2',
    },
  ]);

  const [ProductStockRequesteditData, ProductStockRequestsetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      ProductStockRequestData,
      setProductStockRequestData,
      ProductStockRequesteditData,
      ProductStockRequestsetEditData,
    }),
    [ProductStockRequestData, setProductStockRequestData, ProductStockRequestsetEditData, ProductStockRequesteditData]
  );

  return (
    <ProductStockRequestContext.Provider value={contextValues}>{children}</ProductStockRequestContext.Provider>
  );
};

ProductStockRequestProvider.propTypes = {
  children: PropTypes.any,
};
