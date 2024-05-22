import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
// import { Cookies, useCookies } from "react-cookie";

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const [CategoryData, setCategoryData] = useState( [
    { id: 1, Category_name: 'DD', status:'Active',createdBy:'Asmi Banthia',WareHouseId:"1",
    ParentId:'2' },
    {
        id: 2, Category_name: 'Asmi', status:'Not Active',createdBy:'Asmi Banthia',WareHouseId:"3",
        ParentId:'3' 
    },
    {
        id: 3, Category_name: 'Heena', status:'Not Active',createdBy:'Asmi Banthia',WareHouseId:"1",
        ParentId:'4' 
    },
    {
        id: 4, Category_name: 'Yanu', status:'Active',createdBy:'Asmi Banthia',WareHouseId:"1",
        ParentId:'3' 
    },
    {
        id: 5, Category_name: 'Manya', status:'Active',createdBy:'Asmi Banthia',WareHouseId:"2",
        ParentId:'5' 
    },
  ])
 

  const [CategoryeditData,CategorysetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
        CategoryData,
        setCategoryData,
      CategoryeditData,
      CategorysetEditData
    }),
    [CategoryData,CategoryeditData]
  );

  return <CategoryContext.Provider value={contextValues}>{children}</CategoryContext.Provider>;
};

CategoryProvider.propTypes = {
  children: PropTypes.any,
};
