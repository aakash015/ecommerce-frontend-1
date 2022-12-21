import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { isAuthenticated } from '../auth/helper'
import { userContext } from '../contexts/userContext'
import Base from '../core/Base'
import { deleteProduct, getProducts } from './helper/adminapicall'

const ManageProducts = () => {

  const [products,setProducts] = useState([]);
  
  const {user} = useContext(userContext)
  const {token} = user;
  
  const preload =  ()=> {
     
    
       getProducts().then(data=>{
       
           if(data.error){
               console.log(data.error)
           }else{
            
             setProducts(data);
           }
       }).catch((err)=>console.log(err))

  }

  useEffect(()=>{

     preload();
     
  },[])
  

  const deleteThisProduct = (productId)=>{
         
       deleteProduct(productId,user._id,token).then(data=>{

            if(data.error)
             console.log(data.error);
            else{
               preload()
            }   
    })
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
    <h2 className="mb-4">All products:</h2>
    <NavLink className="btn btn-info" to={`/admin/dashboard`}>
      <span className="">Admin Home</span>
    </NavLink>
    <div className="row">
      <div className="col-12">
        <h2 className="text-center my-3">Total {products.length} products</h2>



       
      {products.map((product,index) => (
                    <div key={index} className="row text-center mb-2 ">
                     <div className="col-4">
                       <h3 className="text-left">{product.name}</h3>
                     </div>
                     <div className="col-4">
                       <NavLink
                         className="btn btn-success"
                         to={`/admin/product/update/${product._id}`}
                       >
                         <span>Update</span>
                       </NavLink>
                     </div>
                     <div className="col-4">
                       <button onClick={() => {
                         deleteThisProduct(product._id)
                         }} className="btn btn-danger">
                         Delete
                       </button>
                     </div>
                   </div>
              ))}
      </div>
    </div>
  </Base>
  )
}

export default ManageProducts