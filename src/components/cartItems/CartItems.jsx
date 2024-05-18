

import React, { useContext } from 'react'
import './cartitems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'

const CartItems = () => {

  function scrollToTop (){
    let scrollToTop = () => {
      window.scrollTo(0,0)
    }
  }

  function navigateToCheckout (){
    window.location.href = '/CheckOut';
    window.addEventListener('scroll', scrollToTop);
  }


  const { all_product, cartItems, removeFromCart,getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className='cartitem'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}> {/* Adding key prop for optimization */}
              <div className="cartitem-format cartitems-format-main">
      <Link to={`/product/${e.id}`}>   <img src={e.image} alt="" className='carticon-product-icon'/> </Link>
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartItems-remove-icon' src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}} />
              </div>
              <hr />
            </div>
          );
        }
        return null; // Return null if the condition is not met
      })}
      <div className="cartitems-down ">
        <div className="cartitems-total border shadow ">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                <p>Shipping fee</p>
                <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <Link to='/CheckOut' className='pay'><button onClick={window.scrollTo(0,0)}>PROCEED TO PAY</button></Link>
        </div>

      </div>
    </div>
  );
}

export default CartItems;
