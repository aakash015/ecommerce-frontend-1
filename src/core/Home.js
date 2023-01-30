import React, { useContext, useEffect, useState } from 'react'
import { API } from '../backend'
import bag from '../assets/hero-bag.jpg'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { cartContext } from '../contexts/cartContext'
import { userContext } from '../contexts/userContext'
import WaitingLoader from './WaitingLoader'
import { loadingContext } from '../contexts/loadingContext'



function Home() {
  
  const [products, setProducts] = useState([]);
  const [error,setError] = useState(false);

   const {user} = useContext(userContext);
   const {cartItems,setCartItems} = useContext(cartContext);
   const {loading} = useContext(loadingContext)
  const myfunc = async()=>{
         
   if(user && user._id){
    const middle = await fetch(`${API}/cart/getitemsfromcart`,{
     method:'POST',
     headers:{
       "content-type":'application/json',
       "Accept":"application/json"
      },
     body:JSON.stringify({_id:user._id}),
    });


    const data = await middle.json();

    setCartItems(data.cart)
    
  }

}

  const loadAllProduct = ()=>{
    console.log("hello i am called")
      getProducts().then(data=>{
        console.log(data)
          if(data.error){
            setError(data.error)
          }else{
             setProducts(data);
          }
      })
  }

  useEffect(() => {
     loadAllProduct()
    if(user!=null && user._id!=null){ 
     myfunc()
    }

  }, [user]);

  
  return (
    
     <div className="text-center">
      
    <Base src={bag} image={true} title='Happiness is not in money,
     but in shopping.' button={true}>
          <h1>All Products</h1>
         
          {loading && <WaitingLoader />}
         
          <div>
          
          
         
          
          <div className="row">
          
            {products.map((product,index)=>{
                let prod = cartItems.find(o => o.product._id === product._id);
                
                let quantity = prod===undefined?0:prod.quantity;
                let bool = (prod!==undefined && prod.quantity!==0)?true:false;
                let bool2 = bool?false:true
               return(
                 <div key={index} className="col-md-4 mb-5">
                    <Card product={product} qtybtn={bool} addToCart={bool2} quantity={quantity}/>
                 </div>
               )
            })}
          </div>
          </div>
    </Base>
         
     </div>

   
  )
}

export default Home