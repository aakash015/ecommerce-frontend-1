import React,{useContext, useState} from 'react'
import './signin.css'
import loginscreen from '../assets/login-screen.png'
import {Link, Redirect} from "react-router-dom"
import { authenticate, signin } from '../auth/helper';
import {toast } from 'react-toastify';
import Menu from '../core/Menu';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../contexts/userContext';


function Signin() {

  const {user,setUser} = useContext(userContext);

  const [values,setValues] = useState({
    email: "",
    password: "",
    error:"",
    loading:false,
    didRedirect: false,
  });

  const {email,password,loading,didRedirect} = values


  // const {user} = isAuthenticated();

  const handleChange = (event,name)=>{
    setValues({...values,error:false,[name]: event.target.value})
    //[name] object key variable nhi ho sakti hai isliye hi ye synatx 
    //use kiya jaata hai 

  } 


  const onSubmit = async(event)=>{

    event.preventDefault();
    

   

    setValues({...values,error:false,loading:true})
    const data = await signin({email,password});

      if(data.error){
        toast.error('Signin Failed')
         setValues({...values,error:data.error,loading: false})
       
      }else{
        toast.success('Signin Successfull')
          authenticate(data,setUser);
          setValues({...values,
            
            didRedirect:true
          })
                }
  }


  const performRedirect = ()=>{
    
      if(didRedirect){
        if(user && user.role===1)
          return <Redirect to="/admin/dashboard"/>
        else
            return <Redirect to="/user/dashboard"/>
      }

      if(user)
        return <Redirect to="/" /> 
  }

  const loadingMessage = ()=>{
    
    return( 
     loading && <div className="alert alert-info"
     >
     <h2>Loading...</h2>
     </div>
    )
 }
 

 const forgotPassword = async()=>{
        
  const email =values.email;
  
     if(email==="")
      return toast.error('Please enter email then click forgot password');

  
     const middle = await fetch(`http://localhost:3100/api/forgotpassword`,{
       method:'POST',
       body:JSON.stringify({email:email}),
       headers:{
        "content-type":'application/json',
        "Accept":"application/json"
       }      
     })

     const response = await middle.json();
      
     if(response.message)
     {
        return toast.error('No account found with this mail');
     }
    
     if(response.accepted)
     {
      return toast.info('Password reset link sent to your mail')
     }else{
      return toast.error('some error occured');
     } 

 }

  const signInForm = ()=>{

    return(
      
      <div className='Form mt-auto'>
       <div className='container cust-container-signin'>
          <div className='row no-gutters custom-row-signin'>
              <div className='col-lg-5'>
                   <img src={loginscreen} className='img-fluid cust-img-signin' alt='.'/>
              </div>
              <div className='col-lg-7 px-5 pt-5'>
                <h1 className='py-3 custom-h1-signin'>WELCOME USER</h1>
                <h4>Signin into your account</h4>
              <form>
                 <div className="form-row">
                  <div className='col-lg-12'>
                   <input 
                     onChange={(e)=>handleChange(e,"email")} 
                     value={email} type="email" 
                     className='form-control my-3' 
                     placeholder='Email Address'
                     />
                  </div>
                   
                 </div>
                 <div className="form-row">
                  <div className='col-lg-12'>
                  <input 
                     value={password} 
                     onChange={(e)=>handleChange(e,"password")} 
                     type="password" 
                     className='form-control mb-3'
                     placeholder='Password'
                  />
                 
                  </div>
                   
                 </div>

                 
                 <div className="form-row">
                  <div className='col-lg-12'>
                  <button onClick={onSubmit} className="btn1 mb-3 form-control">Login</button>
                  </div>
                   
                  
                 </div>
                  
                  <div className='form-row'>
                    <div className='col-lg-12 text-center mb-3'>
                    <Link onClick={forgotPassword}>forgot password? click here</Link>
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
      {loadingMessage()}
       {signInForm()}
       {performRedirect()}
      
    </>

  )
}

export default Signin