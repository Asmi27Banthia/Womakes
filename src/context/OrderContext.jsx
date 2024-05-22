import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


export const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [OrderData, setOrderData] = useState( [
    {   id: 1, 
        user_Id:'1',
        cart_Id:'1',
        baseTotal:'12',
        grandTotal:'123',
        discountAmount:'12',
        discountCode:'GIVE20',
        status:'Active',
        address_Id:'3',
        paymentStatus:'Done',
        deliveryCharge:'789'
        
    },
    {
        id: 2,
        user_Id:'2',
        cart_Id:'5',
        baseTotal:'546',
        grandTotal:'777',
        discountAmount:'10',
        discountCode:'MAGIC10',
        status:'Not Active',
        address_Id:'1',
        paymentStatus:'Done',
        deliveryCharge:'400'
        
    },
    {
        id: 3, 
        user_Id:'3',
        cart_Id:'3',
        baseTotal:'780',
        grandTotal:'1000',
        discountAmount:'50',
        discountCode:'GIVEAWAY50',
        status:'Not Active',
        address_Id:'1',
        paymentStatus:'Not Done',
        deliveryCharge:'100'

    },
    {
        id: 4,
        user_Id:'4',
        cart_Id:'2',
        baseTotal:'567',
        grandTotal:'700',
        discountAmount:'15',
        discountCode:'GIVE15',
        status:'Active',
        address_Id:'4',
        paymentStatus:'Done',
        deliveryCharge:'200'
    },
    {
        id: 5,
        user_Id:'5',
        cart_Id:'2',
        baseTotal:'100',
        grandTotal:'300',
        discountAmount:'30',
        discountCode:'GO30',
        status:'Not Active',
        address_Id:'1',
        paymentStatus:'Done',
        deliveryCharge:'400'
    },
  ])
 

  const [OrdereditData,OrdersetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        OrderData,
        setOrderData,
      OrdereditData,
      OrdersetEditData
    }),
    [OrderData,OrdereditData,setOrderData,OrdersetEditData]
  );

  return <OrderContext.Provider value={contextValues}>{children}</OrderContext.Provider>;
};

OrderProvider.propTypes = {
  children: PropTypes.any,
};
