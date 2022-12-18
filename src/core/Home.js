import React, { useContext, useEffect, useState } from 'react'
import { API } from '../backend'
import bag from '../assets/hero-bag.jpg'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import CartContextProvider, { cartContext } from '../contexts/cartContext'
import { userContext } from '../contexts/userContext'


function Home() {
  
  const [products, setProducts] = useState([]);
  const [error,setError] = useState(false);

   const {user} = useContext(userContext);
   const {cartItems,setCartItems} = useContext(cartContext);

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

    console.log("@@@@@")
    console.log(data);
    setCartItems(data.cart)
    
  }
    // console.log(data);

}

  const loadAllProduct = ()=>{
      getProducts().then(data=>{
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

  // let {cartItems} = useContext(cartContext);

//   console.log("this is object")
// //   console.log(obj)
// console.log(cartItems)
// console.log("home component rerendered")
console.log("these are products")
console.log(products);

console.log("these are cartItems");
console.log(cartItems)
  return (
    
     <div className="text-center">
      
    <Base src={bag} image={true} title='Happiness is not in money,
     but in shopping.' button={true}>
          <h1>All Products</h1>
           {/* <h2>{cartItems}</h2> */}
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
    </Base>
         
     </div>

   
  )
}

export default Home