import React from "react";
import  ReactDOM  from "react-dom";
import "./styles.css"
import App from "./App";
import CartContextProvider from "./contexts/cartContext";
import UserContextProvider from "./contexts/userContext";

ReactDOM.render(

  <UserContextProvider> 
   <CartContextProvider>
   <App />
   </CartContextProvider>
   </UserContextProvider>
   
   ,document.getElementById("root")
   
)
