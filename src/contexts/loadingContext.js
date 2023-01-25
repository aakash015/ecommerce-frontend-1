import React,{useState,createContext}  from 'react';

export const loadingContext = createContext();

const LoadingContextProvider = ({children})=>{
     
     
  const [loading,setLoading] = useState(false)

 return (
        <loadingContext.Provider value={{loading,setLoading}}>
         {
          children
         }
        </loadingContext.Provider>
  )
  
}

export default LoadingContextProvider