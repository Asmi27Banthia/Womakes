import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import dosaimage from '../../public/assets/images/productlisting/dosa_productlisting.jpg';
// import rasgullaimage from '../../public/assets/images/productlisting/rasgulla_productlisting.jpg';
// import gulabjamunimage from '../../public/assets/images/productlisting/gulabjamun_productlisting.jpg'
// import  samosaimage from '../../public/assets/images/productlisting/samosa_productlisting.jpg'
// import khakraimage  from '../../public/assets/images/productlisting/khakra_productlisting.jpg'

import { toast } from 'react-toastify';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [ProductData, setProductData] = useState([
    {
      id: 1,
      Product_name: 'Khakra',
      url:'../../public/assets/images/productlisting/khakra_productlisting.jpg',
      sku:'200',
      price:'1000',
      weight:'2',
      description:'abc',
      status:'Active',
      approvedBy:'Asmi Banthia',
      approvedDate:'1999-01-01',
      Vendor_Id:'2',
      Category_Id: '1',
      SubCategory_Id: '1',
      WareHouseId: '2',
    },
    {
      id: 2,
      Product_name: 'Rasgulla',
      url:'../../public/assets/images/productlisting/rasgulla_productlisting.jpg',
      sku:'569',
      price:'200',
      weight:'1',
      description:'cde',
      status:'Not Active',
      approvedBy:'Asmi Banthia',
      approvedDate:'2009-07-02',
      Vendor_Id:'5',
      Category_Id: '2',
      SubCategory_Id: '1',
      WareHouseId: '4',
    },
    {
      id: 3,
      Product_name: 'Dosa',
      url:'../../public/assets/images/productlisting/dosa_productlisting.jpg',
      sku:'343',
      price:'540',
      weight:'3',
      description:'efg',
      status:'Not Active',
      approvedBy:'Asmi Banthia',
      approvedDate:'2010-02-08',
      Vendor_Id:'4',
      Category_Id: '4',
      SubCategory_Id: '3',
      WareHouseId: '1',
    },
    {
      id: 4,
      Product_name: 'Gulab Jamun',
      url:'../../public/assets/images/productlisting/gulabjamun_productlisting.jpg',
      sku:'497',
      price:'700',
      weight:'10',
      description:'ghi',
      status:'Active',
      approvedBy:'Asmi Banthia',
      approvedDate:'2016-04-19',
      Vendor_Id:'2',
      Category_Id: '1',
      SubCategory_Id: '3',
      WareHouseId: '3',
    },
    {
      id: 5,
      Product_name: 'Samosa',
      url:'../../public/assets/images/productlisting/samosa_productlisting.jpg',
      sku:'655',
      price:'800',
      weight:'9',
      description:'ijk',
      status:'Active',
      approvedBy:'Asmi Banthia',
      approvedDate:'2024-05-01',
      Vendor_Id:'1',
      Category_Id: '4',
      SubCategory_Id: '2',
      WareHouseId: '3',
    },
  ]);

  const [ProducteditData, ProductsetEditData] = useState(null);

  const contextValues = useMemo(
    () => ({
      ProductData,
      setProductData,
      ProducteditData,
      ProductsetEditData,
    }),
    [ProductData, setProductData, ProductsetEditData, ProducteditData]
  );

  return (
    <ProductContext.Provider value={contextValues}>{children}</ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.any,
};
