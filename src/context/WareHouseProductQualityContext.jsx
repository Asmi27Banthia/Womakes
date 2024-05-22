import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const WareHouseProductQualityContext = createContext({});

export const WareHouseProductQualityProvider = ({ children }) => {
  const [WareHouseProductQualityData, setWareHouseProductQualityData] = useState( [
    {
        id: 1,
        Product_Id:'2',
        checkDate:'2020-04-06',
        passed:'True',
        checkedBy:'Asmi Banthia'
      },
    {
      id: 2,
      Product_Id:'5',
      checkDate:'2022-08-16',
      passed:'False',
      checkedBy:'Asmi Banthia'
    },
    {
      id: 3,
      Product_Id:'1',
      checkDate:'2019-12-29',
      passed:'True',
      checkedBy:'Asmi Banthia'
    },
    {
      id: 4,
      Product_Id:'4',
      checkDate:'2020-09-11',
      passed:'True',
      checkedBy:'Asmi Banthia'
    },
    {
      id: 5,
      Product_Id:'3',
      checkDate:'2024-10-21',
      passed:'False',
      checkedBy:'Asmi Banthia'
    },
  ])
 

  const [WareHouseProductQualityeditData,WareHouseProductQualitysetEditData]=useState(null);


  const contextValues = useMemo(
    () => ({
      WareHouseProductQualityData,
      setWareHouseProductQualityData,
      WareHouseProductQualityeditData,
      WareHouseProductQualitysetEditData
    }),
    [WareHouseProductQualityData,WareHouseProductQualityeditData,setWareHouseProductQualityData,WareHouseProductQualitysetEditData]
  );

  return <WareHouseProductQualityContext.Provider value={contextValues}>{children}</WareHouseProductQualityContext.Provider>;
};

WareHouseProductQualityProvider.propTypes = {
  children: PropTypes.any,
};
