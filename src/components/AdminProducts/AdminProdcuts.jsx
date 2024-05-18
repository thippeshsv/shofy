import React, { useState, useEffect,useContext } from 'react';
import './AdminProducts.css'
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3001/adminProducts'


const AdminProducts = (props) => {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  let handleAddToCart = (e) =>{
    e.preventDefault()
    addToCart(props.id);
    toast.success('Item added to cart',{
      position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
    })
  }
  const {addToCart} = useContext(ShopContext);


  return (
    <div className='recently-added'>
      <h2>Recently added</h2>
      <hr />
    <div className='recently-added-items'>
   
        {products.map(product =>
         (
            <div className='item'>
             
 
 <img src={`${BASE_URL}/${product.image}`} alt={product.name} />
<p>{product.name}</p>

        
          <div className="item-prices">
              <div className="item-price-new">
  ${product.oldPrice}
              </div>
              <div className="item-price-old">
  ${product.newPrice}
              </div>
              {/*  */}
              <button   onClick={handleAddToCart} className='btn btn-light rounded-0   btn-sm ms-5'>ADD TO CART</button>
     
          </div>
            </div>
       
        ))}
    
    </div>
      
    </div>
  );
};

export default AdminProducts;
