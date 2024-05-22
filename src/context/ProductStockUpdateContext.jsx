import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const ProductStockUpdateContext = createContext({});

export const ProductStockUpdateProvider = ({ children }) => {
  const [ProductStockUpdateData, setProductStockUpdateData] = useState([
    {
      id: 1,
      Product_Id: '2',
      Request_Id:'1',
      Stock_Id:'3',
      currentQty:'12',
      addedQty:'23',
      minusQty:'10',
      finalQty:'25',
      status:'Active',
      WareHouseId: '2',
    },
    {
      id: 2,
      Product_Id: '1',
      Request_Id:'1',
      Stock_Id:'4',
      currentQty:'22',
      addedQty:'14',
      minusQty:'2',
      finalQty:'34',
      status:'Active',
      WareHouseId: '4',
    },
    {
      id: 3,
      Product_Id: '5',
      Request_Id:'3',
      Stock_Id:'1',
      currentQty:'34',
      addedQty:'15',
      minusQty:'20',
      finalQty:'29',
      status:'Not Active',
      WareHouseId: '1',
    },
    {
      id: 4,
      Product_Id: '2',
      Request_Id:'1',
      Stock_Id:'5',
      currentQty:'50',
      addedQty:'10',
      minusQty:'20',
      finalQty:'40',
      status:'Active',
      WareHouseId: '1',
    },
    {
      id: 5,
      Product_Id: '3',
      Request_Id:'2',
      Stock_Id:'1',
      currentQty:'29',
      addedQty:'11',
      minusQty:'5',
      finalQty:'35',
      status:'Not Active',
      WareHouseId: '1',
    },
  ]);

  const [ProductStockUpdateeditData, ProductStockUpdatesetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      ProductStockUpdateData,
      setProductStockUpdateData,
      ProductStockUpdateeditData,
      ProductStockUpdatesetEditData,
    }),
    [ProductStockUpdateData, setProductStockUpdateData, ProductStockUpdatesetEditData, ProductStockUpdateeditData]
  );

  return (
    <ProductStockUpdateContext.Provider value={contextValues}>{children}</ProductStockUpdateContext.Provider>
  );
};

ProductStockUpdateProvider.propTypes = {
  children: PropTypes.any,
};
