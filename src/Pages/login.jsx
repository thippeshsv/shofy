import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageFile = event.target.elements.image.files[0];
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:3001/Signup', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Signup successful');
        navigate('/Login');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className='login'>
      <div className="login-container shadow mb-5">
        <h1>Sign Up</h1>
        <form method='post' onSubmit={handleSubmit} action='http://localhost:3001/Signup'>

        <div className="login-fields">
          <input type="text" name='name'  placeholder='Your Name' />
          <input type="email" name='email' placeholder='Email Address' />
          <input type="password" name='password'placeholder='Password' />
          <input type="file" name='image'placeholder='image' />

          <button type='submit' className='btn  btn-success '>Continue</button>
        </div>
        </form>

        <div className="login-agree">
          <input type="checkbox" name='' />
          <p>I Agree to all Terms and conditions </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

