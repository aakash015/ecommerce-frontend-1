import React, { useContext, useEffect, useState } from 'react'
import {useHistory, useLocation } from 'react-router-dom';
import  yo from '../assets/yo.png' 
import { toast } from 'react-toastify';
import { cartContext } from '../contexts/cartContext';
import { API } from '../backend';
import { userContext } from '../contexts/userContext';

const Price = () => {

   const [total,setTotal] = useState(0);
   const [count,setCount] = useState(0);

   let {cartItems} = useContext(cartContext);
  //  let {user} = useContext(userContext);

   const {user} = useContext(userContext);
   let _id;
  
   if(user!=null)
   _id = user._id; 
   
   const {search} = useLocation();
   const history = useHistory();
  
   useEffect(() => {
    
    let x = 0;
    let c = 0;
    cartItems.map((product)=>{
      x = x+product.quantity*product.price
      c = c+product.quantity;
    })   
    setTotal(x)
    setCount(c);
    
   }, [cartItems]);


   const myfunc = async(orderid)=>{
       
    const order =  JSON.parse(localStorage.getItem('order'));

    let n = order.length;
    let amount = 0;
  
    

  
      const products =  order.slice(0,n-1);
      const address =  order[n-1];
      products.map((product)=>
        amount = amount+product.quantity*product.price 
      )

   
    const finalObj = {
      products,
      orderid,
      amount,
      address,
      user:_id
    }
    
   try{ 
   if(user!=null){ 
    
    const temp = await fetch(`${API}/order/create/${_id}`,{
      method:"POST",
      headers:{
        Accept: "application/json",
    "Content-type": "application/json"
      },
      body:JSON.stringify(finalObj)
    });

  const data = await temp.json();
    
   
  
   return ;
   
}}
   catch(error){

   }
}

   const paymentMethod = async ()=>{
        
      if(!user)
      {
           toast.error('Please signin to continue');
           history.push('/signin')
            // return <Redirect to='/signin' />

            return;
      }
      
      try{
        const obj = {
          amount:total
        }

        let data = await fetch(`${API}/checkout`,{
          method:'POST',
         headers:{
           "content-type":"application/json",
           Accept:"application/json"
        },
          body: JSON.stringify(obj)
        })
         
        let {order} = await data.json()
        
        
        myfunc(order.id);

        const options = {
          key: 'rzp_test_E40cuMeJFCETnK', 
          amount: order.amount, 
          currency: "INR",
          name: "YO! Merchandise",
          description: "Pay",
          image:yo,
          order_id: order.id,
          callback_url: `${API}/paymentverification`,
          prefill: {
              name:user.name,
              email: user.email,
              contact:"8750043604"
          },
          notes: {
             order: JSON.stringify(cartItems)
          },
          theme: {
              color: "#13C962"
          }
      };

        let rzp1 = await new window.Razorpay(options);
        rzp1.open();
      }

      catch(err){
        console.log(err)
      }
   }

  return (
       <>
       <h3>Subtotal({count} Items) </h3>
      <h1>₹ {total}</h1>
      {
      history.location.pathname==="/addressverification"&& <button className='btn btn-block btn-success' style={{
        borderRadius:'10px' 
      }} onClick = {paymentMethod} disabled={user.address.length===0?true:false}>Proceed To payment</button>}

      {
      history.location.pathname!=="/addressverification"&&  
      <button className='btn btn-block btn-warning' style={{
        borderRadius:'10px'
      }} onClick ={()=>{history.push('/addressverification')}} >Proceed To Buy</button>

    }
      </>
  )
}

export default Price