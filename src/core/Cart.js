import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../contexts/cartContext'
import Base from './Base'
import Card from './Card'
import cartimg from '../assets/cartimg.jpg'
import Price from '../price/Price'
// import { toast } from 'react-toastify'




function Cart() {
  
  const [products, setProducts] = useState([]);
  const [reload,setReload] = useState(false);
  let {cartItems} = useContext(cartContext);

  
  useEffect(() => {
    
    setProducts(cartItems)
  }, [cartItems]);

  
  const loadAllProducts=()=>{
       return(
         <div>
           {
            
            
           products.map((p,index)=>{
            
            const {product} = p;

            let bool = p!==undefined&&p.quantity>1?true:false;
            let bool2 = !bool;
            
           
             
            return <Card 
              key={index}
              product={p.product}
              addToCart={false}
              removeFromCart={bool2}
              qtybtn={bool}
              setReload = {setReload}
              reload = {reload}
              quantity={p.quantity}
             />
           })}
         </div>
       )
  }

  


  return (
    <Base title="" description='' src={cartimg} image={true}>
     <div className="row text-center">
        {products.length>0&&<><div className="col-lg-8">{loadAllProducts()}</div>
          <div className="col-lg-4">
            <Price />
            </div></>}

        {products.length===0 && <><h1 className='ml-5'>Your Cart Is Empty </h1></>}    
     </div>

    </Base>
  )
}

export default Cart