import React,{useState} from 'react'
import './AdminPage.css'
import {useNavigate} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';


const AdminPage = () => {
  let navigate = useNavigate()

  let [name, setName] = useState('');
  let [category, setCategory] = useState('');
  let [oldPrice, setOldPrice] = useState('');
  let [newPrice, setNewPrice] = useState('');
  let [image, setImage] = useState(null);




let UserName = localStorage.getItem('name')





const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create FormData object to store form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('oldPrice', oldPrice);
    formData.append('newPrice', newPrice);
    formData.append('image', image);

    // Send FormData object in fetch request
    const response = await fetch('http://localhost:3001/adminPage', {
      method: 'POST',
      body: formData // No need to stringify, FormData handles it
    });
    console.log(response)

    if (response.ok) {
      // Reset form fields and state after successful submission
      setName('');
      setCategory('');
      setOldPrice('');
      setNewPrice('');
      setImage(null);
      console.log('Product added successfully');
     
      // alert('Product added successfully');
      toast.success('Congratulations!! Your product added to the website successfully')
      setTimeout(() => {
        navigate('/');
      }, 3000);;

    } else {
      // Handle error response
      const errorData = await response.json();
      console.error('Error adding product else:', errorData.error);
    }
  } catch (error) {
    // Handle fetch error
    console.error('Error adding product:', error);
    // alert('Failed to add product. Please try again later.');
  }
};

  return (
   
       <div className='adminPage'>
        <p>Welcome  <span>{UserName}</span></p>
      <h2>Add Product</h2>
      <form  className='admin-form shadow' onSubmit={handleSubmit}>
        <div  className='admin-form-input'>
          <label htmlFor="name">Name of the product</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
           
       
            required
          />
        </div>
        <div  className='admin-form-input'>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
          
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div  className='admin-form-input'>
          <label htmlFor="oldPrice">Old Price:</label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={oldPrice}
            onChange={(e)=> setOldPrice(e.target.value)}
          
            required
          />

        </div>
     

        <div  className='admin-form-input'>
          <label htmlFor="newPrice">New Price:</label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            value={newPrice}
            onChange={(e)=> setNewPrice(e.target.value)}
          
            required
          />
        </div>
        <div  className='admin-form-input'>
          <label htmlFor="newPrice">Product Image: </label>
          <input
            type="file"
            id="image"
            name="image"
            // value={formData.newPrice}
            onChange={(e)=> {setImage(e.target.files[0])}}
        
            required
          />
            </div>
        <button type="submit"  className='admin-button btn btn-success'>Add Product</button>
        <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                
                />
      </form>
    </div>

  )
}

export default AdminPage
