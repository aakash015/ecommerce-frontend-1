import React,{ useContext, useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext';
import Base from '../core/Base'
import { getCategory, updateCategory } from './helper/adminapicall'








const UpdateCategory = ({computedMatch}) => {
  
  const [category, setCategory] = useState({
    name: "",
    id:"",
    success:""
  });

  const {user} = useContext(userContext)
  const {token} = user;
  const categoryId = computedMatch.params.categoryId;

  const preload = (categoryId)=>{
      getCategory(categoryId)
      .then((data)=>{
         if(data && data.error)
           console.log(data.error)
         else
          {
             setCategory({
                name : data.name,
                id:data._id,
                success:false
             })

            //  console.log(category)
          }
      })
      .catch(err=>console.log(err))
  }
  useEffect(() => {
     preload(categoryId);
  }, []);

  const handleChange = name => event =>{
      
    const value = event.target.value;
    
    setCategory({...category,[name]:value})
             

  }

  const onSubmit = (event)=>{
       event.preventDefault();
       
       setCategory({...category,success:false})
      

       updateCategory(categoryId,user._id,token,category)
       .then((data)=>{
          if(data && data.error)
           console.log(data.error)
          else{
            setCategory({name:"",id:"",success:true});

           
          } 
       })
  }

  const myCategoryForm = ()=>{
   return( 
    <form>
       <div className="form-group">
         <h3>Update the category</h3>
         <input type="text" className="form-control my-3"
            value={category.name}
           onChange = {handleChange("name")}
         required autoFocus/>
         <button 
         className='btn btn-outline-info'
         onClick={onSubmit}
         >Update Category</button>
       </div>
     </form>)
  }

  const successMessage = ()=>{
        
    if(category.success){
      return <h4 className="text-success">Category Updated successfully</h4>
    }
  }

  return (
    <Base title='Create a category here' description='Add a new category for new tshirts'
     className='container bg-info p-4 '
    >
       <div className="row bg-white rounded">
         <div className="col-md-8 offset-md-2">
           {successMessage()}
          {myCategoryForm()}
         </div>
       </div>
    </Base>
  )
}

export default UpdateCategory