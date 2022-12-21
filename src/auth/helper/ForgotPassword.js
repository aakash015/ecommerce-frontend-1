import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Menu from '../../core/Menu';
import forgot from '../../assets/forgot.jpg'
import expired from '../../assets/expired.png' 
import {toast } from 'react-toastify';
import { API } from '../../backend';
import broken from '../../assets/broken.gif'

function parseJwt (token) {
  const decode = JSON.parse(atob(token.split('.')[1]));
  return decode
}

const ForgotPassword = () => {

  const {token} = useParams();
  

  const {_id,iat,exp} = parseJwt(token);
  

  const history = useHistory();

    const [resetpass,setResetPass] = useState({
      pass:"",
      cPass:""
    })
   
    const {pass,cPass} = resetpass;
    
    let disabled = cPass!=="" && pass!=="" && pass===cPass?false:true;

  const onSubmit = async(e)=>{
            
    e.preventDefault();

      const middle = await fetch(`${API}/resetpassword`,{
        method:"POST",
        body:JSON.stringify({
             pass:pass,
             _id:_id     
        }),
        headers:{
          "Accept":"application/json",
          "content-type":"application/json"
        }
      })

      const {response} = await middle.json();
      
      if(response==1)
      {
         
         toast.success("Password Changed Successfully");

         history.push('/signin');
      }else{
        toast.error("An unknown error occured")
      }

 }


  const handleChange = (event,name)=>{
    setResetPass({...resetpass,[name]: event.target.value})
  }

  const form = ()=>{

    return (
      <div> 
      <Menu />
    <div className='Form mt-auto'>
           <div className='container cust-container-signup'>
              <div className='row no-gutters custom-row-signup'>
                  <div className='col-lg-5'>
                       <img src={forgot} className='img-fluid cust-img-signup' alt='.'/>
                  </div>
                  <div className='col-lg-7 px-5 pt-5'>
                    <h1 className='py-3 custom-h1-signup'>Forgot Password?</h1>
                    <h4>Reset your password here</h4>
                  <form>
                     
                     <div className="form-row">
                      <div className='col-lg-12'>
                      <input type="password" className='form-control mb-3'
                      placeholder='Enter new password'
                      value={pass}
                       onChange={(e)=>handleChange(e,"pass")}/>
                      </div>
                       
                     </div>
    
                     <div className="form-row">
                      <div className='col-lg-12'>
                      <input type="password" className='form-control mb-3'
                      placeholder='confirm password'
                      value={cPass}
                       onChange={(e)=>handleChange(e,"cPass")}/>
                      </div>
                       
                     </div>
            
                      <div className='form-row'>
                        <div className='col-lg-12'>
                          {cPass!==""&& cPass!==pass && <small className='text-danger mb-3'>passwords must match</small>}
                        </div>
                      </div>
                     
                     <div className="form-row">
                      <div className='col-lg-12'>
                      <button type='submit' className=" btn1 mb-5 form-control" 
                       disabled={disabled}
                      onClick={(e)=>onSubmit(e)}
                      
                      >Submit</button>
                      </div>
                       
                     </div>
                      
    
                </form>
          
                  </div>
              </div>
           </div>
        </div>
        </div>
    )
  }

  const linkExpired = ()=>{

    return (
     
      <>
        <Menu/>
        <div className='row'>
          <div className='col-lg-8'>
          {/* <img src={expired} alt="Link expired" className='img-fluid'/> */}
          <img src={broken} alt="Link expired" className='img-fluid' style={{width:"100%"}}/>
          </div>
          <div className='col-lg-4 mt-5'>
            <h2>link is not valid anymore</h2>
           
          </div>
        </div>
      </>

    )
  }

  const a = new Date().getTime();

  const isExpired = exp*1000<=a?true:false;
  return(
      
      <>
       {!isExpired && form()}
       {isExpired && linkExpired()}
       </>
    )
}

export default ForgotPassword