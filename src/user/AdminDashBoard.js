import React, { useContext } from 'react'
import Base from '../core/Base'
import { NavLink } from 'react-router-dom';
import { userContext } from '../contexts/userContext';
import Menu from '../core/Menu';


const adminLeftSide = ()=>{
     return (

      <div style={{"height":"100%"}}>
       <div className="card">
         <h4 className="card-header bg-dark text-white">
           Admin Navigation
         </h4>

         <ul className="list-group">
           <li className="list-group-item">
             <NavLink to='/admin/create/category' className="nav-link text-success">Create Categories</NavLink>
           </li>
           <li className="list-group-item">
             <NavLink to='/admin/categories' className="nav-link text-success">Manage Categories</NavLink>
           </li>
           <li className="list-group-item">
             <NavLink to='/admin/create/product' className="nav-link text-success">Create Products</NavLink>
           </li>
           <li className="list-group-item">
             <NavLink to='/admin/products' className="nav-link text-success">Manage Products</NavLink>
           </li>
           
         </ul>
       </div>
       </div>
     );
};

const adminRightSide = (name,email)=>
{
 return( 
   <div className="card mb-4">
     <h4 className="card-header">Admin Information</h4>
     <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">name:</span>{name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">email:</span>{email}
          </li>
     </ul>
   </div>
 )
}

const AdminDashboard = () => {

  const {user} = useContext(userContext)
  
  const {email,name}=user;

  return (
   
    <>
    <Menu />
    <div className='container-fluid'>
    <div className="row mt-5">
      <div className="col-lg-3">{adminLeftSide()}</div>
      <div className="col-lg-9">{adminRightSide(name,email)}</div>
    </div>
    </div>
    </>

  )
}

export default AdminDashboard;