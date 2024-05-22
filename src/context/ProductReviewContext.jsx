import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const ProductReviewContext = createContext({});

export const ProductReviewProvider = ({ children }) => {
  const [ProductReviewData, setProductReviewData] = useState([
    {
      id: 1,
      Product_Id:'3',
      User_Id:'4',
      review:'It is an amazing product',
      star:'4.5',
      Vendor_Id:'5'

    },
    {
      id: 2,
      Product_Id:'2',
      User_Id:'4',
      review:'Taste was phenomenal',
      star:'4.5',
      Vendor_Id:'1'
    },
    {
      id: 3,
      Product_Id:'4',
      User_Id:'5',
      review:'It was in good quality',
      star:'3.5',
      Vendor_Id:'2'
    },
    {
      id: 4,
      Product_Id:'1',
      User_Id:'1',
      review:'Great Taste',
      star:'3',
      Vendor_Id:'2'
    },
    {
      id: 5,
      Product_Id:'3',
      User_Id:'3',
      review:'Fast Delivery and good taste',
      star:'4',
      Vendor_Id:'3'
    },
  ]);

  const [ProductRevieweditData, ProductReviewsetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      ProductReviewData,
      setProductReviewData,
      ProductRevieweditData,
      ProductReviewsetEditData,
    }),
    [ProductReviewData, setProductReviewData, ProductReviewsetEditData, ProductRevieweditData]
  );

  return (
    <ProductReviewContext.Provider value={contextValues}>{children}</ProductReviewContext.Provider>
  );
};

ProductReviewProvider.propTypes = {
  children: PropTypes.any,
};
