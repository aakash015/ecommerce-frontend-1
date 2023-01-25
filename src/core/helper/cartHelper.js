import { toast } from "react-toastify";
import { API } from "../../backend";



export const addItemToCart = async(item,cartItems,setCartItems,_id)=>{
    
  // setTimeout(()=>{
  //   console.log("there here") 
  // },2000)
  if(_id===undefined)
         return toast.warn("please Signin to continue");
        
       
        const num = cartItems.filter(obj=>obj.product._id===item._id);
        
        if(num.length>0 && num[0].quantity===num[0].product.stock)
         return toast.info('Sorry our stock for this product is over');

    try{  

      let object = {
        userid:_id,
        product:item._id,
        name:item.name,
        price:item.price
      }
    const middle = await fetch(`${API}/cart/addtocart`,{
       method:'POST',
       headers:{
        Accept:'application/json',
        "content-type":'application/json'
       },
       body:JSON.stringify(object)
     });

    const response = await middle.json();
     
    
    setCartItems(response.cart);

    
  }
  catch(error){
     console.log("error");
  }  
      
} 





export const removeItemFromCart = async(productId,setCartItems,userId)=>{
   

      

       if(userId===undefined)
         return toast.warn("please Signin to continue");

      try{
        const middle = await fetch(`${API}/cart/removeitemfromcart`,{
          method:'PUT',
          headers:{
            Accept:'application/json',
            "content-type":'application/json'
          },
          body:JSON.stringify({_id:productId})
        });

        const response  = await middle.json();
        
        
        setCartItems(response.cart);

      }
      catch(err){
         console.log("error")
      }

}


export const cartEmpty = next =>{

     if(typeof window!==undefined){
       localStorage.removeItem("cart");
       next();
     }
}

