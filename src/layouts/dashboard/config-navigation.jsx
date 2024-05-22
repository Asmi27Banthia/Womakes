import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'Manager Dashboard',
  //   path: '/manager-dashboard',
  //   icon: icon('managerDashboard'),
  // },
  // {
  //   title: 'Leads',
  //   path: '/leads',
  //   icon: icon('leads'),
  // },
  {
    title: 'Admin',
    // path: '/accounts',
    icon: icon('account'),
    children: [
      {
        title: 'Admin Permission',
        path: '/admin/permission',
        icon: icon('account_details'),
      },
      {
        title: 'Admin Role',
        path: '/admin/role',
        icon: icon('account_details'),
      },
      {
        title: 'Admin User',
        path:'/admin/user',
        icon: icon('account_details'),
      },
    ],
  },
  {
    title: 'Warehouse',
    path: '/warehouse',
    icon: icon('activity'),
  },

  {
    title: 'Vendor',
    path: '/vendor',
    icon: icon('inventory'),
  },
  {
    title: 'Category',
    path: '/category',
    icon: icon('accounting'),
  },
  {
    title: 'Sub Category',
    path: '/subcategory',
    icon: icon('pos'),
  },
  {
    title: 'Product',
    path: '/product',
    icon: icon('reporting'),
    toolTip: 'Reporting Tool And Analytics',
  },

  {
    title: 'Product Stock',
    path: '/productstock',
    icon: icon('consider'),
    // icon: icon('ic_lock'),
    toolTip: 'Repair Order And Billing Estimates',
  },
  {
    title: 'Product Stock Request',
    path: '/productstockrequest',
    icon: icon('ic_cart'),
 
  },
  {
    title: 'Product Stock Update',
    path: '/productstockupdate',
    icon: icon('consider'),
   
  },
  {
    title: 'Product Review',
    path: '/productreview',
    icon: icon('consider'),
   
  },
  {
    title: 'Product Warehouses',
    path: '/productwarehouses',
    icon: icon('ic_lock'),
    
  },
  {
    title: 'Offers',
    path: '/offers',
    icon: icon('consider'),
   
  },
  {
    title: 'Offer Category',
    path: '/offercategory',
    icon: icon('consider'),
   
  },
  {
    title: 'WareHouse Transactions',
    path: '/warehousetransactions',
    icon: icon('ic_cart'),
 
  },
  {
    title: 'WareHouse Product Quality',
    path: '/warehouseproductquality',
    icon: icon('pos'),
  },
  {
      title: 'User',
    path: '/user',
    icon: icon('leads'),
  },
  {
    title: 'Address',
    path: '/address',
    icon: icon('leads'),
  },
  {
    title: 'Order',
    path: '/order',
    icon: icon('pos'),
  },
  {
    title: 'Payment',
    path: '/payment',
    icon: icon('consider'),
   
  },














  
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
