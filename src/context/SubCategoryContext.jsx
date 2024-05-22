import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export const SubCategoryContext = createContext({});

export const SubCategoryProvider = ({ children }) => {
  const [SubCategoryData, setSubCategoryData] = useState([
    {
      id: 1,
      name: 'DD',
      Category_Id: '1',
      WareHouseId: '2',
    },
    {
      id: 2,
      name: 'Asmi',
      Category_Id: '3',
      WareHouseId: '4',
    },
    {
      id: 3,
      name: 'Heena',
      Category_Id: '5',
      WareHouseId: '2',
    },
    {
      id: 4,
      name: 'Payal',
      Category_Id: '2',
      WareHouseId: '5',
    },
    {
      id: 5,
      name: 'Bansari',
      Category_Id: '1',
      WareHouseId: '3',
    },
  ]);

  const [SubCategoryeditData, SubCategorysetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      SubCategoryData,
      setSubCategoryData,
      SubCategoryeditData,
      SubCategorysetEditData,
    }),
    [SubCategoryData, setSubCategoryData, SubCategorysetEditData, SubCategoryeditData]
  );

  return (
    <SubCategoryContext.Provider value={contextValues}>{children}</SubCategoryContext.Provider>
  );
};

SubCategoryProvider.propTypes = {
  children: PropTypes.any,
};
