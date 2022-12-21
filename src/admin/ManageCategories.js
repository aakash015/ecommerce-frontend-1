import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { userContext } from '../contexts/userContext';
import Base from '../core/Base';
import { deleteCategory,getCategories } from './helper/adminapicall';

const ManageCategories = () => {

  const [catgeories,setCategories] = useState([]);

  const {user} = useContext(userContext)
  const {token} = user;

  const preload = ()=>{
       
       getCategories()
       .then((data)=>{
             if(data.error){
                 console.log(data.error);
             }
             else
             {
               setCategories(data);
             }
       })
       .catch(err=>{
            console.log(err) 
       })
  }

  useEffect(() => {
    preload();  
  }, []);

const deleteThisCategory= (categoryId)=>{
      deleteCategory(categoryId,user._id,token)
      .then((response)=>{
                if(response && response.error)
                  console.log(response.error)
                else
                 {
                   preload()
                 }
           }
        )
      .catch((err)=>console.log(err))
}

  return (
    <Base title='Welcome Admin' description='Manage Your Categories here'>
       
       <h2 className="mb-4">All products:</h2>
    <NavLink className="btn btn-info" to={`/admin/dashboard`}>
      <span className="">Admin Home</span>
    </NavLink>
    <div className="row">
      <div className="col-12">
        <h2 className="text-center my-3">Total {catgeories.length} products</h2>
        </div>
        </div>

        {catgeories.map((cate,index) => (
                    <div key={index} className="row text-center mb-2 ">
                     <div className="col-4">
                       <h3 className="text-left">{cate.name}</h3>
                     </div>

                     <div className="col-4">
                       <NavLink
                         className="btn btn-success"
                         to={`/admin/category/update/${cate._id}`}
                       >
                         <span className="">Update</span>
                       </NavLink>
                     </div>
                     <div className="col-4">
                       <button onClick={() => {
                         deleteThisCategory(cate._id)
                         }} className="btn btn-danger">
                         Delete
                       </button>
                     </div>

                     </div>
              ))}
    </Base>
  )
}

export default ManageCategories