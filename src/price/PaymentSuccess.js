import React from 'react'
import {useHistory} from 'react-router-dom'
import thanks from '../assets/Thanks.jpg'
import Base from '../core/Base';
const PaymentSuccess = () => {


  const history = useHistory();
  

 

  return (

    <Base hidden={true}>
    <div className='container-fluid'>
        <h1 className='text-success'>Thanks for choosing us</h1>
        <button className='btn btn-outline-primary' 
onClick={()=>{history.push('/')}}>Back To home</button> 
        <img className='img-fluid' alt='..' src={thanks}/>
       
    </div>
    </Base>
  )
}

export default PaymentSuccess