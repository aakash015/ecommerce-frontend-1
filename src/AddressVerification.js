import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from './contexts/cartContext';
import { userContext } from './contexts/userContext'
import Base from './core/Base';
import Menu from './core/Menu';
import EditAddress from './EditAddress';
import Address from './price/Address';
import Price from './price/Price';

const AddressVerification = () => {

  const {user} = useContext(userContext);
  const {cartItems,setCartItems} = useContext(cartContext);
  
  let [order,setOrder] = useState(null);
 
  const {address} = user

  useEffect(()=>{
     let n = cartItems.length;
     
     let x = [];

     x =  [...cartItems];

     x.push(address[0]);

    

     localStorage.setItem('order',JSON.stringify(x));
     setOrder(x);
     
     
     
  },[])


  const addressInsert = ()=>{
         
      const val =  document.querySelector('input[name="address"]:checked').value;
    
      
      
      let n = order.length;

     order[n-1] = address[val];


      
     localStorage.setItem('order',JSON.stringify(order));

  }

  

  return (
     
    <Base hidden = {true}>
      <div className='row'>
          
       <div className='col-md-8'>
       <h1>Select address to continue</h1>
           {
            
            address.length>0 && address.map((adr,index)=>{

              let check = index===0?true:false
               return (<div key={index}
                 className='ml-3'
               >
                 <input type='radio' defaultChecked = {check} name = 'address' value= {index} onChange={addressInsert}/>
                     <label className='ml-1'>{" "+adr.name}
                      {"  "+adr.address}, {adr.state},{adr.pincode}, Phone number: {adr.phonenumber+" "}
                     {/* <EditAddress index={index}/> */}
                     </label>
                     <hr />
                     
                     </div>
                )
             })
              
             
           }
           <Address />
       </div>

       <div className='col-md-4'>
         <Price />
       </div>
      </div>
      </Base>
  )
}

export default AddressVerification