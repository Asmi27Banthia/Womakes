import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './auth-context';
import { LoaderProvider } from './loader-context';
import { adminPermissionProvider } from './adminpermission-context';
import { AdminRoleProvider } from './AdminRoleContext';
import { AdminUserProvider } from './AdminUserContext';
import { WarehouseProvider } from './WarehouseContext';
import { VendorProvider } from './VendorContext';
import { CategoryProvider } from './CategoryContext';
import { SubCategoryProvider } from './SubCategoryContext';
import { ProductProvider } from './ProductContext';
import { ProductStockProvider } from './ProductStockContext';
import { ProductStockRequestProvider } from './ProductStockRequestContext';
import { ProductStockUpdateProvider } from './ProductStockUpdateContext';
import { ProductReviewProvider } from './ProductReviewContext';
import { ProductWarehousesProvider } from './ProductWarehousesContext';
import { OffersProvider } from './OffersContext';
import { OfferCategoryProvider } from './OfferCategoryContext';
import { WarehouseTransactionsProvider } from './WarehouseTransactionsContext';
import { WareHouseProductQualityProvider } from './WareHouseProductQualityContext';
import { UserProvider } from './UserContext';
import { AddressProvider } from './AddressContext';
import { OrderProvider } from './OrderContext';
import { PaymentProvider } from './PaymentContext';


const ProvidersWrapper = ({ children }) => {
  const providers = {
    AuthProvider,
    LoaderProvider,
    adminPermissionProvider,
    AdminRoleProvider,
    AdminUserProvider,
    WarehouseProvider,
    VendorProvider,
    CategoryProvider,
    SubCategoryProvider,
    ProductProvider,
    ProductStockProvider,
    ProductStockRequestProvider,
    ProductStockUpdateProvider,
    ProductReviewProvider,
    ProductWarehousesProvider,
    OffersProvider,
    OfferCategoryProvider,
    WarehouseTransactionsProvider,
    WareHouseProductQualityProvider,
    UserProvider,
    AddressProvider,
    OrderProvider,
    PaymentProvider

  };
  const ProviderComponents = Object.values(providers);
  return (
    <>
      {ProviderComponents.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children
      )}
    </>
  );
};

export default ProvidersWrapper;

ProvidersWrapper.propTypes = {
  children: PropTypes.any,
};
