import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


export const OffersContext = createContext({});

export const OffersProvider = ({ children }) => {
  const [OffersData, setOffersData] = useState( [
    {   id: 1, 
        name: 'DD', 
        type:'Percentage',
        percentage:'15',
        amount:null,
        maxAmount:'1000',
        code:'Flat15',
        startDate:'2022-03-04',
        endDate:'2023-03-04',
        isCategory:['option'],
        createdBy:'Asmi Banthia',
        
    },
    {
        id: 2,
        name: 'Asmi', 
        type:'Percentage',
        percentage:'10',
        amount:null,
        maxAmount:'1200',
        code:'Flat10',
        startDate:'2021-02-19',
        endDate:'2021-03-18',
        isCategory:[],
        createdBy:'Asmi Banthia',
        
    },
    {
        id: 3, 
        name: 'Heena', 
        type:'Amount',
        percentage:null,
        amount:'100',
        maxAmount:'2000',
        code:'MAGIC200',
        startDate:'2020-08-10',
        endDate:'2024-02-11',
        isCategory:[],
        createdBy:'Asmi Banthia',

    },
    {
        id: 4,
        name: 'Yanu', 
        type:'Amount',
        percentage:null,
        amount:'150',
        maxAmount:'2500',
        code:'GIVEAWAY200',
        startDate:'2024-01-01',
        endDate:'2024-04-24',
        isCategory:[],
        createdBy:'Asmi Banthia',
    },
    {
        id: 5,
        name: 'Manya', 
        type:'Percentage',
        percentage:'20',
        amount:null,
        maxAmount:'2000',
        code:'GIVEAWAY20',
        startDate:'2021-07-16',
        endDate:'2023-09-25',
        isCategory:[],
        createdBy:'Asmi Banthia',
    },
  ])
 

  const [OfferseditData,OfferssetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        OffersData,
        setOffersData,
      OfferseditData,
      OfferssetEditData
    }),
    [OffersData,OfferseditData,setOffersData,OfferssetEditData]
  );

  return <OffersContext.Provider value={contextValues}>{children}</OffersContext.Provider>;
};

OffersProvider.propTypes = {
  children: PropTypes.any,
};
