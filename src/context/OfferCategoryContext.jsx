import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


export const OfferCategoryContext = createContext({});

export const OfferCategoryProvider = ({ children }) => {
  const [OfferCategoryData, setOfferCategoryData] = useState( [
    {   id: 1, 
        Offer_Id:'3',
        Category_Id:'2',
        SubCategory_Id:'5'
        
    },
    {
        id: 2,
        Offer_Id:'1',
        Category_Id:'1',
        SubCategory_Id:'3'
        
    },
    {
        id: 3, 
        Offer_Id:'5',
        Category_Id:'3',
        SubCategory_Id:'4'

    },
    {
        id: 4,
        Offer_Id:'1',
        Category_Id:'2',
        SubCategory_Id:'4'
    },
    {
        id: 5,
        Offer_Id:'2',
        Category_Id:'5',
        SubCategory_Id:'1'
    },
  ])
 

  const [OfferCategoryeditData,OfferCategorysetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        OfferCategoryData,
        setOfferCategoryData,
      OfferCategoryeditData,
      OfferCategorysetEditData
    }),
    [OfferCategoryData,OfferCategoryeditData,setOfferCategoryData,OfferCategorysetEditData]
  );

  return <OfferCategoryContext.Provider value={contextValues}>{children}</OfferCategoryContext.Provider>;
};

OfferCategoryProvider.propTypes = {
  children: PropTypes.any,
};
