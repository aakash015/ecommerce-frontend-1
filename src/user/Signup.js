import React,{useState} from 'react'
import loginscreen from '../assets/login-screen.png'
import { signup } from '../auth/helper';
import signupImg from '../assets/signup-img.png'
import {toast } from 'react-toastify';
import './signup.css'
import Menu from '../core/Menu';
import WaitingLoader from '../core/WaitingLoader';



function Signup() {


  let [loading,setLoading] = useState(false);

  const [values,setValues] = useState({
    name: "",
    email: "",
    password: "",
    error:"",
    success: false,
  })

  const {name,email,password,error,success} = values;

  
  
  const handleChange = (event,name)=>{
    setValues({...values,error:false,[name]: event.target.value})
    //[name] object key variable nhi ho sakti hai isliye hi ye synatx 
    //use kiya jaata hai 

  } 

  const onSubmit = async(event)=>{
  
     event.preventDefault();
     
      setLoading(true);

     setValues({...values,error:false});

     const data = await signup({name,email,password})
     
     if(data.err){
      setValues({...values,error: data.error,success:false})
      toast.error('Signup failed')
     }
     else{
      toast.success('Signup Successfull. Please signin')
       setValues({
         ...values,
         name:"",
         email:"",
         password:"",
         error:"",
         success: true
       })
     }
     
     setLoading(false);
 }

  const signUpForm = ()=>{
    return(
      

<div className='Form mt-auto'>
       <div className='container cust-container-signup'>
          <div className='row no-gutters custom-row-signup'>
              <div className='col-lg-5'>
                   <img src={signupImg} className='img-fluid cust-img-signup' alt='.'/>
              </div>
              <div className='col-lg-7 px-5 pt-5'>
                <h1 className='py-3 custom-h1-signup'>HEY NEW USER</h1>
                <h4>Signup Here</h4>
              <form>

               <div className="form-row">
                {loading && <WaitingLoader />}
                  <div className='col-lg-12'>
               <input type="text" 
                  className='form-control my-3' 
                  value={name} 
                  onChange={(e)=>handleChange(e,"name")}
                  placeholder = 'Name' 
               />
                     
                  </div>
                   
                 </div>
                 
                
                 <div className="form-row">
                  <div className='col-lg-12'>
                  <input type="email" className='form-control mb-3'
                  placeholder='email'
                   value={email} onChange={(e)=>handleChange(e,"email")}/>
                  </div>
                   
                 </div>

                 <div className="form-row">
                  <div className='col-lg-12'>
                  <input type="password" className='form-control mb-3' value={password}
                  placeholder='password'
                   onChange={(e)=>handleChange(e,"password")}/>
                  </div>
                   
                 </div>

                 
                 <div className="form-row">
                  <div className='col-lg-12'>
                  <button type='submit' className=" btn1 mb-5 form-control" 
                   disabled = {loading}
                  onClick={(e)=>onSubmit(e)}
                  >Submit</button>
                  </div>
                   
                 </div>
                  

            </form>
      
              </div>
          </div>
       </div>
    </div>


     
    )
}



  return (
    <>
     <Menu />
    
       {signUpForm()}
    </> 
    
  )

}

export default Signup