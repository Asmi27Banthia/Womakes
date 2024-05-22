import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
export const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
  const [PaymentData, setPaymentData] = useState( [
    {   id: 1,
        status:'Not Active',
        paymentReference_Id:'2',
        amount:'12000',
        order_Id:'2',
        user_Id:'1'
    },
    {
      id: 2,
      status:'Not Active',
      paymentReference_Id:'1',
      amount:'17000',
      order_Id:'3',
      user_Id:'2'
    },
    {
      id: 3,
      status:'Active',
      paymentReference_Id:'4',
      amount:'10000',
      order_Id:'5',
      user_Id:'3'
    },
    {
      id: 4,
      status:'Not Active',
      paymentReference_Id:'5',
      amount:'5000',
      order_Id:'2',
      user_Id:'4'
    },
    {
      id: 5,
      status:'Active',
      paymentReference_Id:'3',
      amount:'13000',
      order_Id:'4',
      user_Id:'5'
    },
  ])
 

  const [PaymenteditData,PaymentsetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
      PaymentData,
      setPaymentData,
      PaymenteditData,
      PaymentsetEditData
    }),
    [PaymentData,PaymenteditData,setPaymentData,PaymentsetEditData]
  );

  return <PaymentContext.Provider value={contextValues}>{children}</PaymentContext.Provider>;
};

PaymentProvider.propTypes = {
  children: PropTypes.any,
};
