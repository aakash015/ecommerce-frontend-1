import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { cartContext } from '../contexts/cartContext';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';
import './card.css'
import { userContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
import { loadingContext } from '../contexts/loadingContext'

  
  const Card = ({product,addToCart=true,removeFromCart=true,
    setReload
    ,reload=undefined,
    qtybtn = true,
    quantity
  }) => {
      
   

      
       const [redirect,setRedirect] = useState();
     
       let {cartItems,setCartItems} = useContext(cartContext);
       let {loading,setLoading} = useContext(loadingContext)
       const {user} = useContext(userContext);
      
       let _id;

      if(user)
       _id = user._id;
         
       const cartTitle = product?product.name: "A photo"
   
       const cartPrice = product?product.price: "DEFAULT"
       
       const addToCartHelper = async()=>{
         
        
        //  toast.info('adding product wait for a while');
         setLoading(true);
        //  document.getElementById('lo').style.marginTop = window.innerHeight+"50vh"
         await addItemToCart(product,cartItems,setCartItems,_id)
         setLoading(false);
       
       }
       const getARedirect = (redirect)=>{
           if(redirect){
               return <Redirect to='/cart' />
           }
       }
       
       
       const showAddToCart = (addToCart)=>{
         
          return(
            addToCart &&(
                <button
                    onClick={addToCartHelper}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                    disabled={loading || product.stock===0?true:false}
                    data-toggle="modal" data-target="#loaderModal"
                    
                >
                 Add to Cart
                </button>
            )
          )
      }

      const outOfStock = ()=>{

        return (<h3 style={{color:"red"}}>
          Out Of stock 
        </h3>)
      }

       const showQuantityButton = ()=>{

       return (qtybtn && (<div className="input-group">
         <span className="input-group-btn">
            <button type="button" className="btn btn-rounded btn-danger btn-number btn-qty"  data-type="minus" data-field=""
              onClick={async() => {
                // toast.warn('removing product from cart wait for a while')
                setLoading(true)
                await removeItemFromCart(product._id,setCartItems,_id)
                setLoading(false)
              }}
              disabled = {loading?true:false}
              data-toggle="modal" data-target="#loaderModal"
            >
              -
            </button>
         </span>
         <input type="number" id="quantity" name="quantity" className="form-control input-number input-qty" value={quantity} min="1" max="3"
           onChange={()=>{}}
         />
          <span className="input-group-btn">
            <button type="button"  className="btn btn-success btn-number btn-qty" data-type="plus" data-field=""
              onClick={addToCartHelper} disabled={loading || product.stock===0?true:false} data-toggle="modal" data-target="#loaderModal"
            >
               +
            </button>
          </span>
      </div>))
       }

      const showRemoveFromCart = (removeFromCart)=>{
      return removeFromCart && (<button
            onClick={() => {
              removeItemFromCart(product._id,setCartItems,_id)
              setReload(!reload)  
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
            data-toggle="modal" data-target="#loaderModal"
            disabled = {loading}
        >
           Remove from cart
        </button>)
      }

    return (
      <div className="card h-100 mb-5 rounded ml-1 shadow-lg">
        <div className="card-body">
          {getARedirect(redirect)}
             <ImageHelper  product={product} />
             < hr/>
          <p className="lead font-weight-normal text-wrap">
            {cartTitle}
          </p>
          <p className="bg-success rounded  btn-sm px-4">₹ {cartPrice}</p>
          <div className="row">
             {/* code starts from here */}

             <div className="col-12">
              {
                showQuantityButton()
              }  
             </div>
            {/*code ends here*/}

            <div className="col-12">
              {product.stock===0 && outOfStock()}
              {showAddToCart(addToCart)}
            </div>
             <div className="col-12">
              {!(window.location.pathname==='/')&& showRemoveFromCart(removeFromCart)}
            </div>

           
          </div>
        </div>
      </div>
    );
  };
  
  


export default Card