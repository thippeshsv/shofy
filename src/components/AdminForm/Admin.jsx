import React from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavBar'
import {Link, useNavigate} from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();


    let handleSubmit= async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);

        try{
            let response = await fetch('http://localhost:3001/AdminSignup',{
                method: 'POST',
                body: formData
            })

            if(response.ok){
                console.log('admin registered successfully')
                navigate('/AdminLogin')
            }else{
                console.log('Signup failed')
            }
        } catch(error){
            console.log('signup error:', error)
        }


    }





  return (
    <div>
    
      <div className='login'>
      <div className="login-container shadow">
        <h1 className='ms-4  ps-5 text-success fw-bold '> Admin Sign Up</h1>
        <form method='post' onSubmit={handleSubmit}  action='http://localhost:3001/AdminSignup'>

        <div className="login-fields">
          <input type="text" name='name'  placeholder='Your Name' />
          <input type="email" name='email' placeholder='Email Address' />
          <input type="password" name='password'placeholder='Password' />
          {/* <input type="file" name='image'placeholder='image' /> */}

          <button type='submit' className='btn  btn-primary '>Continue</button>
        </div>
        </form>

        <div className="login-agree">
          <input type="checkbox" name='' />
          <p>I Agree to all Terms and conditions </p>
        </div>
        <p>Already have an account  <Link to='/AdminLogin' style={{textDecoration: 'none'}}><span className='text-danger fw-bold'>Login</span></Link> </p>

      </div>

    </div>
    </div>
  )
}

export default Admin
