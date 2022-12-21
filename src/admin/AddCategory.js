import React,{useContext, useState} from 'react'
import { userContext } from '../contexts/userContext'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'


const AddCategory = () => {

   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);
    
   const {user}= useContext(userContext)
   
   const {token} = user;

  
   const handleChange = (event)=>{
      
       setName(event.target.value);
   }

   const onSubmit = (event)=>{

    event.preventDefault();
    // setSuccess(false);
    createCategory(user._id,token,{name})
     .then(data=>{
        if(data.error){
          setError(true);
        }
        else{
          setError("");
          setSuccess(true);
          setName("");
        }
     })

   }
   const successMessage = ()=>{
        
       if(success){
         return <h4 className="text-success">Category created successfully</h4>
       }
   }

   const errorMessage = ()=>{
       if(error){
          return <h4 className="text-danger">Failed to create category</h4>
      }
   }
   const myCategoryForm = ()=>{
         return( <form>
            <div className="form-group">
              <h3>Enter the category</h3>
              <input type="text" className="form-control my-3"
               value={name}
               onChange = {handleChange}
              required autofocus/>
              <button 
              className='btn btn-outline-info'
              onClick={onSubmit}
              >Create Category</button>
            </div>
          </form>)
   }

  return (
    <Base title='Create a category here' description='Add a new category for new tshirts'
     className='container bg-info p-4 '
    >
       <div className="row bg-white rounded">
         <div className="col-md-8 offset-md-2">
           {successMessage()}
           {errorMessage()}
          {myCategoryForm()}
         </div>
       </div>
    </Base>
  )
}

export default AddCategory

//fetesta@gmail.com