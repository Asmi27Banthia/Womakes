import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import AddWareHouse from 'src/forms/AddWareHouse';
import DashboardLayout from 'src/layouts/dashboard';
import AddVendor from 'src/forms/AddVendor'
import AddAdminRole from 'src/forms/AddAdminRole'
import AddCategory from 'src/forms/AddCategory';
import AddSubCategory from 'src/forms/AddSubCategory';
import AdminUser from 'src/pages/AdminUser';
import Vendor from 'src/pages/Vendor';
import Warehouse from 'src/pages/Warehouse';
import AddAdminUser from 'src/forms/AddAdminUser'
import Category from 'src/pages/Category';
import SubCategory from 'src/pages/SubCategory';
import Product from 'src/pages/Product';
import AddProduct from 'src/forms/AddProduct'
import AddProductStock from 'src/forms/AddProductStock'
import AddProductStockRequest from 'src/forms/AddProductStockRequest'
import AddProductStockUpdate from 'src/forms/AddProductStockUpdate'
import AddProductWarehouses from 'src/forms/AddProductWarehouses'
import ProductStock from 'src/pages/ProductStock';
import ProductStockRequest from 'src/pages/ProductStockRequest';
import ProductStockUpdate from 'src/pages/ProductStockUpdate';
import ProductWarehouses from 'src/pages/ProductWarehouses';
import ProductReview from 'src/pages/ProductReview';
import AddProductReview from 'src/forms/AddProductReview';
import Offers from 'src/pages/Offers';
import AddOffers from 'src/forms/AddOffers';
import OfferCategory from 'src/pages/OfferCategory';
import AddOfferCategory from 'src/forms/AddOfferCategory';
import WarehouseTransactions from 'src/pages/WarehouseTransactions';
import AddWarehouseTransactions from 'src/forms/AddWarehouseTransactions';
import WareHouseProductQuality from 'src/pages/WareHouseProductQuality';
import AddWarehouseProductQuality from 'src/forms/AddWarehouseProductQuality';
import Usserr from 'src/pages/MainUser';
import AddUser from 'src/forms/AddUser';
import ViewUser from 'src/pages/ViewUser';
import Address from 'src/pages/Address';
import AddAddress from 'src/forms/AddAddress';
import Order from 'src/pages/Order';
import AddOrder from 'src/forms/AddOrder';
import Payment from 'src/pages/Payment';
import AddPayment from 'src/forms/AddPayment';
export const IndexPage = lazy(() => import('src/pages/app'));
export const ManagerDashboard = lazy(() => import('src/pages/ManagerDashboard'));
export const AddAdminPermission = lazy(() => import('src/forms/AddAdminPermission'));
export const AccountView = lazy(() => import('src/pages/AccountView'));
export const AdminRole = lazy(() => import('src/pages/AdminRole'));
export const Leads = lazy(() => import('src/pages/Leads'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignPage = lazy(() => import('src/pages/Signup'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'admin/permission', element: <AccountView /> },
        { path: 'admin/role', element: <AdminRole /> },
        {path:'admin/user' , element : <AdminUser/>},
        {path: 'warehouse',element: <Warehouse/>},
        {path: 'vendor',element: <Vendor/>},
        {path: 'addAdminPermission',element: <AddAdminPermission/>},
        {path: 'addWarehouse',element:<AddWareHouse/>},
        {path: 'addVendor',element:<AddVendor/>},
        {path: 'addAdminRole',element:<AddAdminRole/>},
        {path: 'addAdminUser',element:<AddAdminUser/>},
        {path: 'category',element:<Category/>},
        {path: '/addCategory',element:<AddCategory/>},
        {path: 'subcategory',element:<SubCategory/>},
        {path: '/addSubCategory',element:<AddSubCategory/>},
        {path: 'product',element:<Product/>},
        {path: '/addProduct',element:<AddProduct/>},
        {path: 'productstock',element:<ProductStock/>},
        {path: '/addProductStock',element:<AddProductStock/>},
        {path: 'productstockrequest',element:<ProductStockRequest/>},
        {path: '/addProductStockRequest',element:<AddProductStockRequest/>},
        {path: 'productstockupdate',element:<ProductStockUpdate/>},
        {path: '/addProductStockUpdate',element:<AddProductStockUpdate/>},
        {path: 'productreview',element:<ProductReview/>},
        {path: '/addProductReview',element:<AddProductReview/>},
        {path: 'productwarehouses',element:<ProductWarehouses/>},
        {path: '/addProductWarehouses',element:<AddProductWarehouses/>},
        {path: 'offers',element:<Offers/>},
        {path: '/addOffers',element:<AddOffers/>},
        {path: 'offercategory',element:<OfferCategory/>},
        {path: '/addOfferCategory',element:<AddOfferCategory/>},
        {path: 'warehousetransactions',element:<WarehouseTransactions/>},
        {path: '/addWarehouseTransactions',element:<AddWarehouseTransactions/>},
        {path: 'warehouseproductquality',element:<WareHouseProductQuality/>},
        {path: '/addWarehouseProductQuality',element:<AddWarehouseProductQuality/>},
        {path: 'user',element:<Usserr/>},
        {path: '/addUser',element:<AddUser/>},
        {path: '/viewUser',element:<ViewUser/>},
        {path: 'address',element:<Address/>},
        {path: '/addAddress',element:<AddAddress/>},
        {path: 'order',element:<Order/>},
        {path: '/addOrder',element:<AddOrder/>},
        {path: 'payment',element:<Payment/>},
        {path: '/addPayment',element:<AddPayment/>},
        // {path:'*', element:<Usserr /> }

        
      ],
     
    },
    
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
