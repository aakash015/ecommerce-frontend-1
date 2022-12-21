import React from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom";
import AddressVerification from './AddressVerification';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';

import ManageProducts from './admin/ManageProducts';
import UpdateCategory from './admin/UpdateCategory';
import UpdateProduct from './admin/UpdateProduct';
import AdminRoutes from './auth/helper/AdminRoutes';
import ForgotPassword from './auth/helper/ForgotPassword';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Cart from './core/Cart';
import Home from './core/Home';
import PaymentSuccess from './price/PaymentSuccess';
import AdminDashboard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashBoard';


function Routes() {
  return (
    <BrowserRouter>
      
       <Switch>
         <Route exact path='/' component={Home}  />
         <Route exact path='/passwordreset/:token' component={ForgotPassword}/>
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/signin" component={Signin} />
         <Route exact path="/cart" component={Cart} />
         <PrivateRoutes Component={UserDashboard} exact path="/user/dashboard"/>
         <PrivateRoutes Component={AddressVerification} exact path="/addressverification"/>
         <Route component={PaymentSuccess} path='/paymentsuccess' />
         <AdminRoutes exact path="/admin/dashboard" Component={AdminDashboard}/>
         <AdminRoutes exact path="/admin/create/category" Component={AddCategory}/>
         <AdminRoutes exact path='/admin/categories' Component={ManageCategories} />
         <AdminRoutes exact path='/admin/create/product' Component={AddProduct} />
         <AdminRoutes exact path='/admin/products' Component={ManageProducts} />
         <AdminRoutes 
         exact 
         path='/admin/product/update/:productId' 
         Component={UpdateProduct} />

         <AdminRoutes 
         exact 
         path='/admin/category/update/:categoryId' 
         Component={UpdateCategory} />
          
       </Switch>
    
    </BrowserRouter>
  )
}

export default Routes