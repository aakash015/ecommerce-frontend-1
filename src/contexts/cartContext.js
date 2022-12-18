import React,{useState,createContext, useEffect, useContext}  from 'react';
import { userContext } from './userContext';
import { API } from '../backend'

export const cartContext = createContext();


const CartContextProvider = ({children})=>{

 
  const [cartItems,setCartItems] = useState([]);

   
  //  console.log("context invoked")
  return (
        <cartContext.Provider value={{cartItems,setCartItems}}>
         {
          children
         }
        </cartContext.Provider>
  )
}

export default CartContextProvider