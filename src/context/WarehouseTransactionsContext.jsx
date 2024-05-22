import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
export const WarehouseTransactionsContext = createContext({});

export const WarehouseTransactionsProvider = ({ children }) => {
  const [WarehouseTransactionsData, setWarehouseTransactionsData] = useState( [
    {   id: 1,
        Product_Id:'2',
        WareHouseId:'1',
        qty:'200',
        transaction_type:'Sale',
        transaction_date:'2022-09-14'
    },
    {
      id: 2,
      Product_Id:'4',
      WareHouseId:'2',
      qty:'100',
      transaction_type:'Sale',
      transaction_date:'2021-01-09'
    },
    {
      id: 3,
      Product_Id:'3',
      WareHouseId:'3',
      qty:'150',
      transaction_type:'Restock',
      transaction_date:'2022-11-06'
    },
    {
      id: 4,
      Product_Id:'2',
      WareHouseId:'1',
      qty:'250',
      transaction_type:'Restock',
      transaction_date:'2024-12-29'
    },
    {
      id: 5,
      Product_Id:'1',
      WareHouseId:'1',
      qty:'4500',
      transaction_type:'Sale',
      transaction_date:'2012-10-27'
    },
  ])
 

  const [WarehouseTransactionseditData,WarehouseTransactionssetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
      WarehouseTransactionsData,
      setWarehouseTransactionsData,
      WarehouseTransactionseditData,
      WarehouseTransactionssetEditData
    }),
    [WarehouseTransactionsData,WarehouseTransactionseditData,setWarehouseTransactionsData,WarehouseTransactionssetEditData]
  );

  return <WarehouseTransactionsContext.Provider value={contextValues}>{children}</WarehouseTransactionsContext.Provider>;
};

WarehouseTransactionsProvider.propTypes = {
  children: PropTypes.any,
};
