import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import './checkout.css';

const stripePromise = loadStripe('pk_test_51PDkBfSE2vOi9de6QpwlCaRmps4upQia0SzVb4F8Lf9TRRseHt1isZNXCInaLTtcBhURULqUZSVvHSCCZ2p47fTl00rR0UB4jo');



const CheckOut = () => {
    const { getTotalCartAmount } = useContext(ShopContext);

    let {getTotalCartItem} = useContext(ShopContext)

    const handleConfirmOrder = async () => {


        try {
            const userEmail = localStorage.getItem('email');

            const stripe = await stripePromise;
            const response = await stripe.redirectToCheckout({
                mode: 'payment',
                lineItems: [
                    { price: 'price_1PE1i0SE2vOi9de6xlKNskWE', quantity:1 } // Replace 'PRICE_ID' with the actual price ID
                ],
                successUrl: 'http://localhost:3000/success',
                cancelUrl: 'http://localhost:3000/CheckOut',
                customerEmail: userEmail,
            });
console.log(response)
            if (response.error) {
                console.error('Error:', response.error.message);
                toast.error('Failed to complete payment. Please try again later.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again later.');
        }
     

        // try {
        //     const userEmail = localStorage.getItem('userEmail');

        //     const response = await fetch('http://localhost:3001/sendEmail', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             from: 'thippeshsv0@gmail.com',
        //             to: userEmail,
        //             subject: 'Order Confirmation',
        //             text: 'Congratulations! Your order has been confirmed.'
        //         })
        //     });

        //   if (response.ok) {
        //         toast.success('Congratulations! Your order has been placed successfully');
        //     } else {
        //         toast.error('Failed to place order. Please try again later.');
        //     }  
        // } catch (error) {
        //     console.error('Error sending confirmation email:', error);
        //     toast.error('Error placing order. Please try again later.');
        // }
    };




    let [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        pincode: '', // Added pincode field
        paymentMethod: 'COD', // Default to Cash on Delivery
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData,[name]: value });

    };
    

let handlePaymentMethodChange = (e)=>{
    const { value } = e.target;
    setFormData({ ...formData,paymentMethod: value });
    if(value === 'debitCard' ||  value === 'creditCard'){
        document.querySelector('.cardetails').style.display = 'block';
        document.querySelector('.upiId').style.display = 'none';
    } else if (value === 'upi') {
        document.querySelector('.cardetails').style.display = 'none';
        document.querySelector('.upiId').style.display = 'block';
    } else {
        document.querySelector('.cardetails').style.display = 'none';
        document.querySelector('.upiId').style.display = 'none';
    }
    

}

   

    return (
        <div className='checkout'>
            
            <div className='container-fluid shadow'>
            <h2>Check Out</h2>
                        <form>
                            <label htmlFor='fullName'>
                                Name <hr />
                            </label>
                            <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} placeholder='Enter your FullName ' className='form-control' />
                        </form>
                  
   
                        <form>
                            <label htmlFor='address'>
                                Address <hr />
                            </label>
                            <input type='text' name='address' value={formData.address} onChange={handleChange} placeholder='Enter your full address ' className='form-control' />
                        </form>
                 
              
                        <form>
                            <label htmlFor='city'>
                                City <hr />
                            </label>
                            <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder='Enter your city ' className='form-control' />
                            <label htmlFor='pincode'>
                                Pincode <hr />
                            </label>
                            <input type='text' name='pincode' value={formData.pincode} onChange={handleChange} placeholder='6 Digits Pincode' className='form-control' />
                        </form>
                  
            </div>

            <div className='checkout-right  '>
                <div className='checkout-total border-bottom'>
                <p>Total Payable </p> 
                <p>${getTotalCartAmount()}</p>
                </div>
              

                
            {/* <div className='paymentOptions '>
                <label htmlFor='paymentMethod'>Payment Method</label>
                <select id='paymentMethod' name='paymentMethod' className='form-select' value={formData.paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value='COD'>Cash on Delivery</option>
                    <option value='debitCard'>Debit Card</option>
                    <option value='creditCard'>Credit Card</option>
                    <option value='upi'>UPI ID</option>
                </select>
              
            </div>

           
            <div className="cardetails ">
                    <label htmlFor='cardNumber'>Card Number</label>
                    <input type='number' id='cardNumber' className='form-control' name='cardNumber' value={formData.cardNumber} onChange={handleChange} />

                    <label htmlFor='expiryDate'>Expiry Date</label>
                    <input type='date' className='form-control' id='expiryDate' name='expiryDate' value={formData.expiryDate} onChange={handleChange} />

                    <label htmlFor='cvv'>CVV</label>
                    <input type='number' id='cvv' className='form-control' name='cvv' value={formData.cvv} onChange={handleChange} />
                </div>
                <div className="upiId col-md-6">
    <label htmlFor='upiId'>UPI ID</label>
    <input type='text' id='upiId' name='upiId' placeholder='Enter UPI ID' value={formData.upiId} onChange={handleChange} className='form-control' /> */}
{/* </div> */}

                
                <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-success btn-lg' onClick={handleConfirmOrder}>Confirm Order</button>
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
            </div>
            </div>

        </div>
    );
};

export default CheckOut;
