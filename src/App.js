import React, { useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import { ToastContainer } from 'react-toastify'
import { cartContext } from './contexts/cartContext';
import { loadingContext } from './contexts/loadingContext';
import { userContext } from './contexts/userContext';
import WaitingLoader from './core/WaitingLoader';
import 'rsuite/dist/rsuite.min.css';
import Routes from './Routes'

function App() {

  const {cartItems,setCartItems} = useContext(cartContext);
  const {user,setUser} = useContext(userContext);
  const history = useHistory();
  const {loading} = useContext(loadingContext);
  
  // console.log(loading);

    window.onload =   function(){
      
      let user =   JSON.parse(localStorage.getItem('user'));

     
       
      
      if(user===undefined || user==null)  
       setUser(null)
      else 
      if(Object.keys(user).length === 0)
       setUser(null)
      else 
      setUser({
        ...user
      })

      
      
      

      localStorage.removeItem('user')
  }

    window.onbeforeunload = function(){

       if(user!=null && user!==undefined)
        localStorage.setItem('user',JSON.stringify(user))
       
       
         
    }
  

    
  return (
   
    <>
    <Routes />
    <ToastContainer />
    </>
    
  )
}

export default App