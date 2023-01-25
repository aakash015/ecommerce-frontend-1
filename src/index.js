import React from "react";
import  ReactDOM  from "react-dom";
import "./styles.css"
import App from "./App";
import CartContextProvider from "./contexts/cartContext";
import UserContextProvider from "./contexts/userContext";
import LoadingContextProvider from "./contexts/loadingContext";

ReactDOM.render(

  <UserContextProvider> 
   <CartContextProvider>
    <LoadingContextProvider>
   <App />
   </LoadingContextProvider>
   </CartContextProvider>
   </UserContextProvider>
   ,document.getElementById("root")
   
)
